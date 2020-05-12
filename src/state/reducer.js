import VAL from './const';
import { NewCtxItem, NewCtxHeading, /*NewCtxText*/ } from '../module/ctxpan';
import { FormatTime, FormatFullTotalTime, FormatRunsPosted, FormatIdFromPlayer } from '../module/format';
import { CalculatePoints, TimeNeededForPoints } from '../module/points';
import { RankingTableFromState,
         TrackListTableFromState,
         TrackTableFromState,
         PlayerListTableFromState,
         PlayerTableFromState } from './reducer-table';
//import { merge } from 'lodash';

const initialState = {
	section : 'RANKING',
	page : 0,
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
		lap: 0 //0=overall,1=3lap,2=1lap
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

		if (action.type === 'CHANGE_SECTION') {
			output.section = action.section;
			if (action.page)
				output.page = action.page;
		}

		if (action.type === 'CYCLE_LAP_SETTING') {
			output.settings.lap = (state.settings.lap+1)%VAL.Setting.Lap.length;
		}

		if (action.type === 'UPDATE_TABLE') {
			switch (state.section) {
				case 'RANKING':
					output.table = RankingTableFromState(state);
					break;
				case 'TRACKLIST': 
					output.table = TrackListTableFromState(state);
					break;
				case 'TRACK': 
					output.table = TrackTableFromState(state);
					break;
				case 'PLAYERLIST': 
					output.table = PlayerListTableFromState(state);
					break;
				case 'PLAYER': 
					output.table = PlayerTableFromState(state);
					break;
				default: break;
			}
		}

		if (action.type === 'SET_CTXPAN') {
			output.panel.title = action.title || null;
			let totals;
			let items = []
			switch (action.mode) {
				case 'PLAYERLIST':
					items.push(NewCtxHeading('Stats'));
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
					items.push(NewCtxItem('Runs Posted',FormatRunsPosted(totals.runT,50)));
					items.push(NewCtxHeading('Run Summary'));
					items.push(NewCtxItem('100 Points',totals.pt100));
					items.push(NewCtxItem('90+ Points',totals.pt90));
					items.push(NewCtxItem('50+ Points',totals.pt50));
					items.push(NewCtxHeading('Time Totals'));
					items.push(NewCtxItem('Overall',FormatFullTotalTime(totals.timeT)));
					items.push(NewCtxItem('1-Lap',FormatFullTotalTime(totals.time1L)));
					items.push(NewCtxItem('3-Lap',FormatFullTotalTime(totals.time3L)));
					break;
				case 'TRACKLIST':
					totals = Object.keys(state.levels).reduce((v,t) => {
						v.time1L += state.levels[t].best1L;
						v.time3L += state.levels[t].best3L;
						v.timeT += state.levels[t].best1L + state.levels[t].best3L;
						return v;
					}, {timeT:0, time3L:0, time1L:0});
					items.push(NewCtxHeading('Record Totals'));
					items.push(NewCtxItem('Overall',FormatFullTotalTime(totals.timeT)));
					items.push(NewCtxItem('1-Lap',FormatFullTotalTime(totals.time1L)));
					items.push(NewCtxItem('3-Lap',FormatFullTotalTime(totals.time3L)));
					break;
				case 'TRACK':
					if (Object.keys(state.levels).indexOf(action.level)>=0) {
						const time = state.levels[action.level].best3L;
						items.push(NewCtxHeading('Milestones'));
						items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,90))));
						items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,50))));
						items.push(NewCtxItem('Baseline',FormatTime(TimeNeededForPoints(time))));
					}
					break;
				case 'RANKING':
					items.push(NewCtxHeading('Stats'));
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


		if (action.type === 'ADD_RUN') {
			//{ level:'kjhgfsd', cat:'3L', player:'sdlkjgfh', time:236.987, pts:100, platform:'Nintendo 64', character:'Ben' }
			let cat = VAL.Id.Category[action.cat];
			let playerId = FormatIdFromPlayer(action.player.name);
			let levelId = VAL.Id.Level[action.level].abbr;

			if (!state.levels[levelId])
				output.levels[levelId] = { name:VAL.Id.Level[action.level].name, abbr:VAL.Id.Level[action.level].abbr, best3L:3599.99, best1L:3599.99 };
			if (output.levels[levelId][`best${cat}`] > action.time)
				output.levels[levelId][`best${cat}`] = action.time;

			if (!state.players[playerId])
				output.players[playerId] = { name:action.player.name, ptsALL:0, pts3L:0, pts1L:0, timeALL:0, time3L:0, time1L:0 };

			//todo: add in calculation
			let run = {
				level: levelId,
				cat: cat,
				player: playerId,
				time: action.time,
				points: action.calculate ? 100 : 0,
				platform: action.platform,
				character: action.character
			}
			let test = state.runs.filter(r => levelId===r.level && cat===r.cat && playerId===r.player);
			if (test.length && action.time<test[0].time) {
				let all = state.runs.filter(r => !(levelId===r.level && cat===r.cat && playerId===r.player));
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