import VAL from './const';
import { NewCtxItem, NewCtxHeading, NewCtxText } from '../module/ctxpan';
import { FormatTime, FormatTotalTime, FormatFullTotalTime, FormatPoints, FormatTotalPoints } from '../module/format';
import { CalculatePoints, TimeNeededForPoints } from '../module/points';
//import { merge } from 'lodash';

const initialState = {
	section : 'RANKING',
	page : 0,
	rankingTab: 'ALL',
	trackTab: '3L',
	loading : true,
	table : [],
	menu : [],
	panel : {
		title : null,
		items : []
	},
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
						ptsALL: FormatTotalPoints(p.ptsALL),
						timeALL: FormatTotalTime(Math.floor(p.timeALL)),
						pts1L: FormatTotalPoints(p.pts1L),
						time1L: FormatTotalTime(Math.floor(p.time1L)),
						pts3L: FormatTotalPoints(p.pts3L),
						time3L: FormatTotalTime(Math.floor(p.time3L)),
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
			const table = Object.keys(state.players).map(k => {
				let p = state.players[k];
				let player = { id:k, name:p.name, fields:{} };
				player.fields.ptsALL = FormatTotalPoints(p.ptsALL);
				player.fields.timeALL = FormatTotalTime(Math.floor(p.timeALL));
				return player;
			});
			table.sort((a,b) => a.name.localeCompare(b.name));
			output.table = table;
			output.section = 'PLAYERLIST';
		}

		if (action.type === 'GOTO_PLAYER') {
			output.section = 'PLAYER';
			output.page = action.player;

			const times = state.runs.filter(t => t.player === action.player);
			
			let tracks = Object.keys(state.levels).map(t => ({ id:t, name:state.levels[t].name, fields:{} }) );
			times.forEach(t => {
				let p = tracks.filter(p => p.id===t.level)[0];
				p.fields[`time${t.cat}`] = FormatTime(t.time);
				p.fields[`pts${t.cat}`] = FormatPoints(t.points);
			});
			const levels = Object.keys(VAL.Id.Level);
			tracks.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
			output.table = tracks;
		}

		if (action.type === 'GOTO_TRACKLIST') {
			let table = Object.keys(state.levels).map(k => {
				let t = state.levels[k];
				let track = { id:k, name:t.name, fields:{} };
				track.fields.best3L = FormatTime(t.best3L);
				track.fields.best1L = FormatTime(t.best1L);
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
				p.data[`time${t.cat}`] = FormatTime(t.time,'seconds');
				p.data[`pts${t.cat}`] = FormatPoints(t.points);
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

		if (action.type === 'SET_CTXPAN') {
			output.panel.title = action.title || null;
			let totals;
			let items = []
			switch (action.mode) {
				case 'PLAYERLIST':
					items.push(NewCtxItem('Players',Object.keys(state.players).length));
					items.push(NewCtxItem('Runs',state.runs.length));
					break;
				case 'PLAYER':
					totals = state.runs.reduce((v,t) => {
						if (t.player === action.player) {
							v[`time${t.cat}`] += t.time;
							v.timeT += t.time;
							if (t.points >= 50 && t.points < 90) v.pt50++;
							if (t.points >= 90 && t.points < 100) v.pt90++;
							if (t.points === 100) v.pt100++;
							v.runT++;
						}
						return v;
					}, {timeT:0, time3L:0, time1L:0, runT:0, pt50:0, pt90:0, pt100:0});
					items.push(NewCtxItem('Runs Posted',`${totals.runT}/50`));
					items.push(NewCtxItem('100 Point Times',totals.pt100));
					items.push(NewCtxItem('90+ Point Times',totals.pt90));
					items.push(NewCtxItem('50+ Point Times',totals.pt50));
					items.push(NewCtxItem('1-Lap Total',FormatFullTotalTime(totals.time1L)));
					items.push(NewCtxItem('3-Lap Total',FormatFullTotalTime(totals.time3L)));
					items.push(NewCtxItem('Overall Total',FormatFullTotalTime(totals.timeT)));
					break;
				case 'TRACKLIST':
					totals = Object.keys(state.levels).reduce((v,t) => {
						v.time1L += state.levels[t].best1L;
						v.time3L += state.levels[t].best3L;
						v.timeT += state.levels[t].best1L + state.levels[t].best3L;
						return v;
					}, {timeT:0, time3L:0, time1L:0});
					items.push(NewCtxItem('1-Lap Total',FormatFullTotalTime(totals.time1L)));
					items.push(NewCtxItem('3-Lap Total',FormatFullTotalTime(totals.time3L)));
					items.push(NewCtxItem('Overall Total',FormatFullTotalTime(totals.timeT)));
					break;
				case 'TRACK':
					if (Object.keys(state.levels).indexOf(action.level)>=0) {
						const time = state.levels[action.level][`best${state.trackTab}`];
						items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,90))));
						items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,50))));
						items.push(NewCtxItem('Point Baseline',FormatTime(TimeNeededForPoints(time))));
					}
					break;
				case 'RANKING':
					items.push(NewCtxItem('Players',Object.keys(state.players).length));
					items.push(NewCtxItem('Runs',state.runs.length));
					break;
				default:
					break;
			}
			output.panel.items = items;
		}
		if (action.type === 'RESET_CTXPAN') {
			output.panel.title = action.title || null;
			output.panel.items = [];
		}

		if (action.type === 'CALCULATE_POINTS') {
			Object.keys(state.players).forEach(p => {
				let times = state.runs.filter(r => r.player===p);
				let totals = times.reduce((v,t) => {
					let WR = state.levels[t.level][`best${t.cat}`];
					let pts = CalculatePoints(WR, t.time);
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