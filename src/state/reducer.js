import VAL from './const';
//import { merge } from 'lodash';
import Numeral from 'numeral';
import Moment from 'moment';
import MomentDurationFormat from 'moment-duration-format';
MomentDurationFormat(Moment);

const initialState = {
	section : 'RANKING',
	page : 0,
	rankingTab: 'ALL',
	trackTab: '3L',
	loading : true,
	table : [],
	menu : [],
	players : {},
	levels : {},
	runs : [],
	settings : {
		dark: true,
		refreshable: false,
	}
};

export default (state = initialState, action) => {
	if (action.type) {
		let output = {...state};

		if (action.type === 'TOGGLE_THEME') {
			output.settings.dark = !state.settings.dark;
		}

		if (action.type === 'MARK_LOADING') {
			output.loading = true;
		}
		if (action.type === 'MARK_LOADED') {
			output.loading = false;
		}

		if (action.type === 'CLEAR_DATA') {
			output.runs = [];
			output.levels = {};
			output.players = {};
		}


		if (action.type === 'GOTO_RANKING') {
			output.section = 'RANKING';

			const formatT = VAL.Setting.Format.TotalTime;
			const formatP = VAL.Setting.Format.TotalPoints;
			const table = Object.keys(state.players).map(k => {
				let p = state.players[k];
				let player = {
					id:k,
					name:p.name,
					sortALL:p.ptsALL,
					sort1L:p.pts1L,
					sort3L:p.pts3L,
					fields:{},
					data:{
						ptsALL: Numeral(p.ptsALL).format(formatP),
						timeALL: Moment.duration(Math.floor(p.timeALL),'seconds').format(formatT,{trim:false}),
						pts1L: Numeral(p.pts1L).format(formatP),
						time1L: Moment.duration(Math.floor(p.time1L),'seconds').format(formatT,{trim:false}),
						pts3L: Numeral(p.pts3L).format(formatP),
						time3L: Moment.duration(Math.floor(p.time3L),'seconds').format(formatT,{trim:false}),
					}
				};
				return player;
			});
			output.table = table;
		}

		if (action.type === 'SORT_RANKING' || action.type === 'GOTO_RANKING') {
			if (action.type==='SORT_RANKING') output.rankingTab = action.sort
			let sort = action.type==='SORT_RANKING' ? action.sort : output.rankingTab;
			let table = [...output.table];
			table.sort((a,b) => b[`sort${sort}`] - a[`sort${sort}`]);
			let rank = 0, rankStreak = 0;
			let last = null;
			table.forEach(item => {
				rankStreak++;
				if (item[`sort${sort}`] !== last) {
					rank += rankStreak;
					rankStreak = 0;
				}
				item.fields = {}
				item.fields[`time${sort}`] = item.data[`time${sort}`];
				item.fields[`pts${sort}`] = item.data[`pts${sort}`];
				item.rank = rank;
				last = item[`sort${sort}`];
			});
			output.table = table;
		}


		if (action.type === 'GOTO_PLAYERLIST') {
			const formatT = VAL.Setting.Format.TotalTime;
			const formatP = VAL.Setting.Format.TotalPoints;
			const table = Object.keys(state.players).map(k => {
				let p = state.players[k];
				let player = { id:k, name:p.name, fields:{} };
				player.fields.ptsALL = Numeral(p.ptsALL).format(formatP);
				player.fields.timeALL = Moment.duration(Math.floor(p.timeALL),'seconds').format(formatT,{trim:false});
				return player;
			});
			table.sort((a,b) => a.name.localeCompare(b.name));
			output.table = table;
			output.section = 'PLAYERLIST';
		}

		if (action.type === 'GOTO_PLAYER') {
			output.section = 'PLAYER';
			output.page = action.player;

			const formatT = VAL.Setting.Format.Time;
			const formatP = VAL.Setting.Format.Points;
			const times = state.runs.filter(t => t.player === action.player);
			
			let tracks = Object.keys(state.levels).map(t => ({ id:t, name:state.levels[t].name, fields:{} }) );
			times.forEach(t => {
				let p = tracks.filter(p => p.id===t.level)[0];
				p.fields[`time${t.cat}`] = Moment.duration(t.time,'seconds').format(formatT,{trim:false});
				p.fields[`pts${t.cat}`] = Numeral(t.points).format(formatP);
			});
			const levels = Object.keys(VAL.Id.Level);
			tracks.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
			output.table = tracks;
		}

		if (action.type === 'GOTO_TRACKLIST') {
			const formatT = VAL.Setting.Format.Time;
			let table = Object.keys(state.levels).map(k => {
				let t = state.levels[k];
				let track = { id:k, name:t.name, fields:{} };
				track.fields.best3L = Moment.duration(t.best3L,'seconds').format(formatT,{trim:false});
				track.fields.best1L = Moment.duration(t.best1L,'seconds').format(formatT,{trim:false});
				return track;
			});
			const levels = Object.keys(VAL.Id.Level);
			table.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
			output.table = table;
			output.section = 'TRACKLIST';
		}

		if (action.type === 'GOTO_TRACK') {
			output.section = 'TRACK';
			output.page = action.level;

			const formatT = VAL.Setting.Format.Time;
			const formatP = VAL.Setting.Format.Points;
			const times = state.runs.filter(t => t.level === action.level);
			let players = [];
			times.forEach(t => {
				players = players.filter(p => p.id!==t.player);
				players.push({
					id:t.player,
					name:state.players[t.player].name,
					sort1L:3599.99,
					sort3L:3599.99,
					fields:{},
					data:{}
				})
			});
			times.forEach(t => {
				let p = players.filter(p => p.id===t.player)[0];
				p[`sort${t.cat}`] = t.time;
				p.data[`time${t.cat}`] = Moment.duration(t.time,'seconds').format(formatT,{trim:false});
				p.data[`pts${t.cat}`] = Numeral(t.points).format(formatP);
			});
			output.table = players;
		}

		if (action.type === 'SORT_TRACK' || action.type === 'GOTO_TRACK') {
			if (action.type==='SORT_TRACK') output.trackTab = action.sort
			let sort = action.type==='SORT_TRACK' ? action.sort : output.trackTab;
			let table = [...output.table];
			table.sort((a,b) => a[`sort${sort}`] - b[`sort${sort}`]);
			let rank = 0, rankStreak = 0;
			let last = null;
			table.forEach(item => {
				rankStreak++;
				if (item[`sort${sort}`] !== last) {
					rank += rankStreak;
					rankStreak = 0;
				}
				item.fields = {}
				item.fields[`time${sort}`] = item.data[`time${sort}`];
				item.fields[`pts${sort}`] = item.data[`pts${sort}`];
				item.rank = rank;
				last = item[`sort${sort}`];
			});
			output.table = table;
		}

		if (action.type === 'GOTO_ABOUT') {
			output.section = 'ABOUT';
		}

		if (action.type === 'SET_MENU' || action.type === 'GOTO_RANKING' || action.type === 'GOTO_TRACK') {
			const section = VAL.Sections.filter(s => s.id === output.section)[0];
			if (section) 
				output.menu = section.pages.map((p,i) => { return { value:p.id, label:p.name } });
		}


		if (action.type === 'ADD_RUN') {
			//{ level:'kjhgfsd', cat:'3L', player:'sdlkjgfh', time:236.987, pts:100, platform:'Nintendo 64', character:'Ben' }
			let cat = VAL.Id.Category[action.cat];

				if (!state.levels[action.level])
					output.levels[action.level] = { name:VAL.Id.Level[action.level], best3L:3599.99, best1L:3599.99 };
				if (output.levels[action.level][`best${cat}`] > action.time)
					output.levels[action.level][`best${cat}`] = action.time;

				if (!state.players[action.player.id])
					output.players[action.player.id] = { name:action.player.name, ptsALL:0, pts3L:0, pts1L:0, timeALL:0, time3L:0, time1L:0 };

				//todo: add in calculation
				let run = {
					level: action.level,
					cat: cat,
					player: action.player.id,
					time: action.time,
					points: action.calculate ? 100 : 0,
					platform: action.platform,
					character: action.character
				}
				let test = state.runs.filter(r => action.level===r.level && cat===r.cat && action.player.id===r.player);
				if (test.length && action.time<test[0].time) {
					let all = state.runs.filter(r => !(action.level===r.level && cat===r.cat && action.player.id===r.player));
					all.push(run);
					output.runs = all;
				}
				else if (test.length)
					return state;
				else
					output.runs.push(run);
		}

		if (action.type === 'CALCULATE_POINTS') {
			Object.keys(state.players).forEach(p => {
				let times = state.runs.filter(r => r.player===p);
				let totals = times.reduce((v,t) => {
					let WR = state.levels[t.level][`best${t.cat}`];
					let { Max, Scale, Precision } = VAL.Score;
					let pts = t.time > WR*Scale ? 0 : Math.floor(((1-(t.time-WR)/(WR*Scale-WR))*Max)*(10^Precision))/(10^Precision);
					v['ALL'] += pts;
					v[t.cat] += pts;
					t.points = pts;
					return v;
				}, {'ALL':0, '3L':0, '1L':0});
				output.players[p].ptsALL = totals['ALL'];
				output.players[p].pts3L = totals['3L'];
				output.players[p].pts1L = totals['1L'];
			})
		}

		if (action.type === 'CALCULATE_TIME') {
			Object.keys(state.players).forEach(p => {
				let times = state.runs.filter(r => r.player===p);
				let totals = times.reduce((v,t) => {
					v['ALL'] += t.time;
					v[t.cat] += t.time;
					return v;
				}, {'ALL':0, '3L':0, '1L':0});
				output.players[p].timeALL = totals['ALL'];
				output.players[p].time3L = totals['3L'];
				output.players[p].time1L = totals['1L'];
			})
		}


		return output;
	}
	
	// default
	return state;
};