import VAL from './const.js';

export default {
	clearData: () => ({type:'CLEAR_DATA'}),

	changeSection: (section,page) => ({ type:'CHANGE_SECTION', section:section, page:page }),
	changePage: (page) => ({ type:'CHANGE_PAGE', page:page }),
	changeCtxPan: (section,page) => ({ type:'CHANGE_CTXPAN', section:section, page:page }),

	markLoaded: () => ({type:'MARK_LOADED'}),
	markLoading: (isLoading) => ({ type:'MARK_LOADING', loading:isLoading }),

	updateTable: () => ({ type:'UPDATE_TABLE' }),
	updateCtxPan: (title) => ({ type:'UPDATE_CTXPAN', title:title }),

	calcTotals: () => ({type:'CALCULATE_TOTALS'}),

	toggleTheme: () => ({type:'TOGGLE_THEME'}),

	addRun: (run,players,platforms,variables) => {
		let chars = variables.data.filter(v => v.name==='Character')[0];
		return {
			type: 'ADD_RUN',
			level: run.run.level,
			laps: run.run.category,
			player: run.run.players.map(p => {
				return p.rel === 'guest' ? {
					id: p.name,
					name: p.name
				} : {
					id: p.id,
					name: players.data.filter(item => item.id===p.id)[0].names.international
				}
			})[0],
			time: run.run.times.primary_t,
			platform: platforms.data.filter(p => p.id===run.run.system.platform)[0].name,
			character: run.run.values[chars.id] ? chars.values.values[run.run.values[chars.id]].label : '',
			skips: run.run.values[VAL.Id.Skips.Id] ? run.run.values[VAL.Id.Skips.Id] : '',
			upgrades: run.run.values[VAL.Id.Upgrades.Id] ? run.run.values[VAL.Id.Upgrades.Id] : '',
			date: new Date(run.run.date),
			comment: run.run.comment,
			video: run.run.videos.links[0].uri
		}
	},

	cycleLapSetting: () => ({type:'CYCLE_LAP_SETTING'}),
	toggleSkipsSetting: () => ({type:'TOGGLE_SKIPS_SETTING'}),
	toggleUpgradesSetting: () => ({type:'TOGGLE_UPGRADES_SETTING'}),
	toggleOverallSetting: () => ({type:'TOGGLE_OVERALL_SETTING'}),
	toggleDeveloperMode: () => ({type:'TOGGLE_DEVELOPER_MODE'}),
	toggleDeveloperShow: () => ({type:'TOGGLE_DEVELOPER_SHOW'}),
};