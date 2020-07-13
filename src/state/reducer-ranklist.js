import VAL from './const';
import { FormatTime, FormatTotalTime, FormatPoints, FormatTotalPoints } from '../module/format';
import Numeral from 'numeral';


export const RankingRankListFromState = (state) => {
	const header = [
		{ className:'player', label:'PLAYER' },
		{ className:'points-total', label:'POINTS' },
		{ className:'time-total', label:'TIME' },
	];

	let data = Object.keys(state.players).map(k => {
		let p = state.players[k];
		let totals = state.settings.overall ?
			p.overallTotals :
			VAL.Setting.Lap[state.settings.lap].key==='ALL' ?
				p.combinedTotals.filter(c => c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0] :
				p.totals.filter(c => c.laps===VAL.Setting.Lap[state.settings.lap].key && c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0];
		let player = {
			id:k,
			name:p.name,
			time:totals.time,
			rank:totals.rank,
			out_pts:FormatTotalPoints(totals.pts),
			out_time:FormatTotalTime(totals.time)
		};
		return player;
	});
	data = data.filter(t => t.rank > 0);
	data.sort((a,b) => a.time - b.time);
	data.sort((a,b) => a.rank - b.rank);
	
	const items = data.map(i => ({
		className:`rank-${i.rank}`,
		link:VAL.Routes.PLAYER.replace(':id',i.id),
		panel:{
			s:'PLAYER',
			p:i.id,
			t:i.name,
		},
		fields:[
			{ className:`rank rank-${i.rank}` , label:Numeral(i.rank).format('0o') },
			{ className:'player' , label:i.name },
			{ className:VAL.TableFields.pts , label:i.out_pts },
			{ className:VAL.TableFields.time , label:i.out_time },
		]
	}));
	
	return {
		className : 'ranking-data',
		header : header,
		items : items
	};
}


export const TrackListRankListFromState = (state) => {
	const header = [
		{ className:'track', label:'TRACK' },
		{ className:'best-3lap', label:'3-LAP' },
		{ className:'best-1lap', label:'1-LAP' },
	];
	
	let data = Object.keys(state.levels).map(k => {
		let t = state.levels[k];
		const bests = state.settings.overall ?
			t.bests :
			t.bests.filter(t => t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
		let track = { id:k, name:t.name, best3L:0, best1L:0 };
		bests.forEach(b => { track[`best${b.laps}`] += b.time });
		return track;
	});
	const levels = Object.keys(VAL.Id.Level).map(k => VAL.Id.Level[k].abbr);
	data.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
	
	const items = data.map(i => ({
		className:'',
		link:VAL.Routes.TRACK.replace(':id',i.id),
		panel:{
			s:'TRACK',
			p:i.id,
			t:i.name,
		},
		fields:[
			{ className:'track' , label:i.name },
			{ className:VAL.TableFields.best3L , label:FormatTime(i.best3L) },
			{ className:VAL.TableFields.best1L , label:FormatTime(i.best1L) },
		]
	}));
	
	return {
		className : 'track-list',
		header : header,
		items : items
	};
}


export const TrackRankListFromState = (state) => {
	const header = [
		{ className:'player', label:'PLAYER' },
		{ className:'points', label:'POINTS' },
		{ className:'time', label:'TIME' },
	];
	
	const times = state.settings.overall ?
		state.runs.filter(t => t.level === state.page) :
		VAL.Setting.Lap[state.settings.lap].key==='1L' ?
			state.runs.filter(t => t.level===state.page && t.laps==='1L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades) :
			state.runs.filter(t => t.level===state.page && t.laps==='3L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
	let data = [];
	times.forEach(t => {
		let player = data.filter(p => p.id===t.player);
		if (player.length) {
			player[0].sort += t.points;
			player[0].time += t.time;
			player[0].out_pts = FormatPoints(player[0].sort);
			player[0].out_time = FormatTime(player[0].time);
		} else {
			data.push({
				id:t.player,
				name:state.players[t.player].name,
				rank:t.rank,
				time:t.time,
				out_pts:FormatPoints(t.points),
				out_time:FormatTime(t.time)
			});
		}
	});
	data = data.filter(t => t.time > 0);
	data.sort((a,b) => a.time - b.time);
	data.sort((a,b) => a.rank - b.rank);
	
	const items = data.map(i => ({
		className:`rank-${i.rank}`,
		link:VAL.Routes.PLAYER.replace(':id',i.id),
		panel:{
			s:'PLAYER',
			p:i.id,
			t:i.name,
		},
		fields:[
			{ className:`rank rank-${i.rank}` , label:Numeral(i.rank).format('0o') },
			{ className:'player' , label:i.name },
			{ className:VAL.TableFields.pts , label:i.out_pts },
			{ className:VAL.TableFields.time , label:i.out_time },
		]
	}));
	
	return {
		className : 'track-ranking',
		header : header,
		items : items
	};
}


export const PlayerListRankListFromState = (state) => {
	const header = [
		{ className:'player', label:'PLAYER' },
		{ className:'points', label:'POINTS' },
		{ className:'time', label:'TIME' },
	];

	let data = Object.keys(state.players).map(k => {
		let p = state.players[k];
		let totals = state.settings.overall ?
			p.overallTotals :
			VAL.Setting.Lap[state.settings.lap].key==='ALL' ?
				p.combinedTotals.filter(c => c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0] :
				p.totals.filter(c => c.laps===VAL.Setting.Lap[state.settings.lap].key && c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0];
		let player = {
			id:k,
			name:p.name,
			time:totals.time,
			out_pts:FormatTotalPoints(totals.pts),
			out_time:FormatTotalTime(Math.floor(totals.time))
		};
		return player;
	});
	data = data.filter(t => t.time > 0);
	data.sort((a,b) => a.name.localeCompare(b.name));
	
	const items = data.map(i => ({
		className:'',
		link:VAL.Routes.PLAYER.replace(':id',i.id),
		panel:{
			s:'PLAYER',
			p:i.id,
			t:i.name,
		},
		fields:[
			{ className:'player' , label:i.name },
			{ className:VAL.TableFields.pts , label:i.out_pts },
			{ className:VAL.TableFields.time , label:i.out_time },
		]
	}));
	
	return {
		className : 'player-list',
		header : header,
		items : items
	};
}


export const PlayerRankListFromState = (state) => {
	const header = [
		{ className:'track', label:'TRACK' },
		{ className:'best-3lap', label:'3-LAP' },
		{ className:'best-1lap', label:'1-LAP' },
	];
	
	const times = state.settings.overall ?
		state.runs.filter(t => t.player===state.page) :
		state.runs.filter(t => t.player===state.page && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
	let tracks = Object.keys(state.levels).map(t => ({ id:t, name:state.levels[t].name, data:{time1L:0,pts1L:0,rank1L:0,time3L:0,pts3L:0,rank3L:0} }) );
	times.forEach(t => {
		let p = tracks.filter(p => p.id===t.level)[0];
		p.data[`time${t.laps}`] += t.time;
		p.data[`pts${t.laps}`] += t.points;
		p.data[`rank${t.laps}`] += t.rank;
	});
	const levels = Object.keys(VAL.Id.Level).map(k => VAL.Id.Level[k].abbr);
	tracks.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));

	const items = tracks.map(t => ({
		className:'',
		link:VAL.Routes.TRACK.replace(':id',t.id),
		fields:[
			{ className:'track' , label:state.levels[t.id].name },
			{ className:`time-1lap rank-${t.data.rank1L}` , label:FormatTime(t.data.time1L)||VAL.Setting.Fallback.Time },
			{ className:`points-1lap rank-${t.data.rank1L}` , label:FormatPoints(t.data.pts1L)||VAL.Setting.Fallback.Points },
			{ className:`rank-1lap rank-${t.data.rank1L}` , label:(t.data.rank1L&&Numeral(t.data.rank1L).format('0o'))||VAL.Setting.Fallback.Rank },
			{ className:`time-3lap rank-${t.data.rank3L}` , label:FormatTime(t.data.time3L)||VAL.Setting.Fallback.Time },
			{ className:`points-3lap rank-${t.data.rank3L}` , label:FormatPoints(t.data.pts3L)||VAL.Setting.Fallback.Points },
			{ className:`rank-3lap rank-${t.data.rank3L}` , label:(t.data.rank3L&&Numeral(t.data.rank3L).format('0o'))||VAL.Setting.Fallback.Rank },
		]
	}));
	
	return {
		className : 'player-times',
		header : header,
		items : items
	};
}