export default {
	clearData: () => ({type:'CLEAR_DATA'}),

	changeSection: (section,page) => ({ type:'CHANGE_SECTION', section:section, page:page }),
	changePage: (page) => ({ type:'CHANGE_PAGE', page:page }),
	changeCtxPan: (section,page) => ({ type:'CHANGE_CTXPAN', section:section, page:page }),

	markLoaded: () => ({type:'MARK_LOADED'}),
	markLoading: (isLoading) => ({ type:'MARK_LOADING', loading:isLoading }),

	updateTable: () => ({ type:'UPDATE_TABLE' }),
	updateCtxPan: (title) => ({ type:'UPDATE_CTXPAN', title:title }),

	calcTime: () => ({type:'CALCULATE_TIME'}),
	calcPoints: () => ({type:'CALCULATE_POINTS'}),

	toggleTheme: () => ({type:'TOGGLE_THEME'}),

	addRun: (run,players,platforms,variables) => {
		let chars = variables.data.filter(v => v.name==='Character')[0];
		return {
			type: 'ADD_RUN',
			level: run.run.level,
			cat: run.run.category,
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
			character: run.run.values[chars.id] ? chars.values.values[run.run.values[chars.id]].label : ''
		}
	},

	cycleLapSetting: () => ({type:'CYCLE_LAP_SETTING'})
};