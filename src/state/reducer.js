import VAL from './const';
import { FormatIdFromPlayer } from '../module/format';
import { CalculatePoints, CalculateLevelScale } from '../module/points';
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
import { CreateBlankPlayerObj,
         CreateBlankLevelObj,
         CreateBlankTotalsObj,
         CreateBlankRecordScaleArr,
         GenerateRunVariations } from './reducer-runs';
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
	recordScale: CreateBlankRecordScaleArr(),
	settings : {
		dark: true,
		refreshable: false,
		lap: 0, //0=overall,1=3lap,2=1lap
		skips: true,
		upgrades: true,
		overall: false,
		debugMode: true,
		debugInfo: false
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
			if (state.section==='TRACK')
				output.settings.lap = state.settings.lap===VAL.Setting.Lap.length-1?VAL.Setting.Lap.length-2:VAL.Setting.Lap.length-1;
			else
				output.settings.lap = (state.settings.lap+1)%VAL.Setting.Lap.length;
		}

		if (action.type === 'TOGGLE_SKIPS_SETTING') {
			output.settings.skips = !state.settings.skips;
		}

		if (action.type === 'TOGGLE_UPGRADES_SETTING') {
			output.settings.upgrades = !state.settings.upgrades;
		}

		if (action.type === 'TOGGLE_OVERALL_SETTING') {
			output.settings.overall = !state.settings.overall;
		}

		if (action.type === 'TOGGLE_DEBUG_MODE') {
			output.settings.debugMode = !state.settings.debugMode;
		}

		if (action.type === 'TOGGLE_DEBUG_INFO') {
			output.settings.debugInfo = !state.settings.debugInfo;
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
			let laps = VAL.Id.Category[action.laps] || '1L';
			let skips = Object.keys(VAL.Id.Skips.Value).indexOf(action.skips) >= 0 ? VAL.Id.Skips.Value[action.skips] : true;
			let upgrades = Object.keys(VAL.Id.Upgrades.Value).indexOf(action.upgrades) >= 0 ? VAL.Id.Upgrades.Value[action.upgrades] : true;
			let playerId = FormatIdFromPlayer(action.player.name);
			let levelId = VAL.Id.Level[action.level].abbr;

			if (!state.players[playerId])
				output.players[playerId] = CreateBlankPlayerObj(playerId, action.player.name);

			if (!state.levels[levelId])
				output.levels[levelId] = CreateBlankLevelObj(levelId, VAL.Id.Level[action.level].name);
			
			let bests = output.levels[levelId].bests.filter(b => b.laps===laps && (b.skips===skips||b.skips===true) && (b.upgrades===upgrades||b.upgrades===true));
			bests.forEach(b => {
				if (b.time > action.time) {
					b.time = action.time;
					b.player = playerId;
					let scale = output.recordScale.filter(r => b.laps===r.laps && b.skips===r.skips && b.upgrades===r.upgrades)[0];
					if (scale.time_min > b.time) scale.time_min = b.time;
					if (scale.time_max < b.time) scale.time_max = b.time;
				}
			})

			let runs = GenerateRunVariations({
				level: levelId,
				laps: laps,
				skips: skips,
				upgrades: upgrades,
				player: playerId,
				time: action.time,
				points: 0,
				platform: action.platform,
				character: action.character,
				date: action.date,
				comment: action.comment,
				video: action.video
			});
			runs.forEach(new_r => {
				let test = state.runs.filter(r => levelId===r.level && playerId===r.player && laps===r.laps && new_r.skips===r.skips && new_r.upgrades===r.upgrades);
				if (test.length && new_r.time<test[0].time) {
					let all = state.runs.filter(r => !(levelId===r.level && playerId===r.player && laps===r.laps && new_r.skips===r.skips && new_r.upgrades===r.upgrades));
					all.push(new_r);
					output.runs = all;
				}
				else if (test.length)
					return;
				else
					output.runs.push(new_r);
			});
		}

		if (action.type === 'CALCULATE_TOTALS') {
			Object.keys(state.levels).forEach(l => {
				output.levels[l].bests.forEach(b => {
					let scale = state.recordScale.filter(r => b.laps===r.laps && b.skips===r.skips && b.upgrades===r.upgrades)[0];
					b.scale = CalculateLevelScale(scale.time_min, scale.time_max, b.time)
				});
			});
			Object.keys(state.players).forEach(p => {
				let times = state.runs.filter(r => r.player===p);
				let totals = times.reduce((v,t) => {
					let best = state.levels[t.level].bests.filter(b => b.laps===t.laps && b.skips===t.skips && b.upgrades===t.upgrades)[0];
					let WR = best.time, scale = best.scale;
					let pts = CalculatePoints(WR, t.time, scale);
					let category = v.totals.filter(c => c.laps===t.laps && c.skips===t.skips && c.upgrades===t.upgrades)[0];
					let combined = v.combinedTotals.filter(c => c.skips===t.skips && c.upgrades===t.upgrades)[0];
					category.pts += pts;
					combined.pts += pts;
					v.overallTotals.pts += pts;
					category.time += t.time;
					combined.time += t.time;
					v.overallTotals.time += t.time;
					t.points = pts;
					return v;
				}, CreateBlankTotalsObj());
				output.players[p].totals = totals.totals;
				output.players[p].combinedTotals = totals.combinedTotals;
				output.players[p].overallTotals = totals.overallTotals;
			})
		}


		return output;
	}
	
	// default
	return state;
};