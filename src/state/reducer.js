import VAL from './const';
import { FormatIdFromPlayer } from '../module/format';
import { CalculatePoints } from '../module/points';
import { RankingTableFromState,
         TrackListTableFromState,
         TrackTableFromState,
         PlayerListTableFromState,
         PlayerTableFromState } from './reducer-table';
import { RankingCtxPanFromState,
         TrackListCtxPanFromState,
         TrackCtxPanFromState,
         PlayerListCtxPanFromState,
         PlayerCtxPanFromState } from './reducer-ctxpan';
//import { merge } from 'lodash';

const initialState = {
	section : 'RANKING',
	page : 0,
	loading : true,
	table : [],
	menu : [],
	panel : {
		section : null,
		page : null,
		title : null,
		items : []
	},
	players : {},
	levels : {},
	runs : [],
	settings : {
		dark: true,
		refreshable: false,
		lap: 0, //0=overall,1=3lap,2=1lap
		skips: true,
		upgrades: true
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

		if (action.type === 'CHANGE_CTXPAN') {
			output.panel.section = action.section || null;
			if (action.page)
				output.panel.page = action.page || null;
		}

		if (action.type === 'CYCLE_LAP_SETTING') {
			output.settings.lap = (state.settings.lap+1)%VAL.Setting.Lap.length;
		}

		if (action.type === 'TOGGLE_SKIPS_SETTING') {
			output.settings.skips = !state.settings.skips;
		}

		if (action.type === 'TOGGLE_UPGRADES_SETTING') {
			output.settings.upgrades = !state.settings.upgrades;
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

		if (action.type === 'UPDATE_CTXPAN') {
			output.panel.title = action.title || null;
			const section = state.panel.section || state.section;
			switch (section) {
				case 'RANKING':
					output.panel.items = RankingCtxPanFromState(state);
					break;
				case 'TRACKLIST': 
					output.panel.items = TrackListCtxPanFromState(state);
					break;
				case 'TRACK': 
					output.panel.items = TrackCtxPanFromState(state);
					break;
				case 'PLAYERLIST': 
					output.panel.items = PlayerListCtxPanFromState(state);
					break;
				case 'PLAYER': 
					output.panel.items = PlayerCtxPanFromState(state);
					break;
				default: break;
			}
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