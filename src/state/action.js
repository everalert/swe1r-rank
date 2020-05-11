export default {
	clearData: () => ({type:'CLEAR_DATA'}),

	gotoRanking: () => ({type:'GOTO_RANKING'}),
	gotoAbout: () => ({type:'GOTO_ABOUT'}),
	gotoChangelog: () => ({type:'GOTO_CHANGELOG'}),
	gotoTrack: (id) => ({type:'GOTO_TRACK',level:id}),
	gotoTrackList: () => ({type:'GOTO_TRACKLIST'}),
	gotoPlayer: (id) => ({type:'GOTO_PLAYER',player:id}),
	gotoPlayerList: () => ({type:'GOTO_PLAYERLIST'}),

	sortRanking: (sorting) => ({type:'SORT_RANKING',sort:sorting}),
	sortTrack: (sorting) => ({type:'SORT_TRACK',sort:sorting}),

	calcTime: () => ({type:'CALCULATE_TIME'}),
	calcPoints: () => ({type:'CALCULATE_POINTS'}),

	markLoaded: () => ({type:'MARK_LOADED'}),
	markLoading: () => ({type:'MARK_LOADING'}),

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

	setCtxPanToRanking: (title) => ({type:'SET_CTXPAN',mode:'RANKING',title:title}),
	setCtxPanToPlayerList: (title) => ({type:'SET_CTXPAN',mode:'PLAYERLIST',title:title}),
	setCtxPanToPlayer: (id,title) => ({type:'SET_CTXPAN',mode:'PLAYER',player:id,title:title}),
	setCtxPanToTrackList: (title) => ({type:'SET_CTXPAN',mode:'TRACKLIST',title:title}),
	setCtxPanToTrack: (id,title) => ({type:'SET_CTXPAN',mode:'TRACK',level:id,title:title}),
	resetCtxPan: () => ({type:'RESET_CTXPAN'}),
};