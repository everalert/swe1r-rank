import VAL from './const';
import { FormatTime, FormatTotalTime, FormatPoints, FormatTotalPoints } from '../module/format';


export const RankingTableFromState = (state) => {
	let table = Object.keys(state.players).map(k => {
		let p = state.players[k];
		let totals = state.settings.overall ?
			p.overallTotals :
			VAL.Setting.Lap[state.settings.lap].key==='ALL' ?
				p.combinedTotals.filter(c => c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0] :
				p.totals.filter(c => c.laps===VAL.Setting.Lap[state.settings.lap].key && c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0];
		let player = {
			id:k,
			name:p.name,
			rank:totals.rank,
			time:totals.time,
			fields:{
				pts:FormatTotalPoints(totals.pts),
				time:FormatTotalTime(totals.time)
			}
		};
		return player;
	});
	table = table.filter(t => t.rank > 0);
	table.sort((a,b) => a.time - b.time);
	table.sort((a,b) => a.rank - b.rank);
	return table;
}


export const TrackListTableFromState = (state) => {
	let table = Object.keys(state.levels).map(k => {
		let t = state.levels[k];
		const bests = state.settings.overall ?
			t.bests :
			t.bests.filter(t => t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
		let track = { id:k, name:t.name, best3L:0, best1L:0 };
		bests.forEach(b => { track[`best${b.laps}`] += b.time });
		track.fields = { best3L:FormatTime(track.best3L), best1L:FormatTime(track.best1L) };
		return track;
	});
	const levels = Object.keys(VAL.Id.Level).map(k => VAL.Id.Level[k].abbr);
	table.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
	return table;
}


export const TrackTableFromState = (state) => {
	const times = state.settings.overall ?
		state.runs.filter(t => t.level === state.page) :
		VAL.Setting.Lap[state.settings.lap].key==='1L' ?
			state.runs.filter(t => t.level===state.page && t.laps==='1L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades) :
			state.runs.filter(t => t.level===state.page && t.laps==='3L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
	let table = [];
	times.forEach(t => {
		let player = table.filter(p => p.id===t.player);
		if (player.length) {
			player[0].sort += t.points;
			player[0].time += t.time;
			player[0].fields = { pts:FormatPoints(player[0].sort), time:FormatTime(player[0].time) };
		} else {
			table.push({
				id:t.player,
				name:state.players[t.player].name,
				rank:t.rank,
				time:t.time,
				fields:{ pts:FormatPoints(t.points), time:FormatTime(t.time) }
			});
		}
	});
	table = table.filter(t => t.time > 0);
	table.sort((a,b) => a.time - b.time);
	table.sort((a,b) => a.rank - b.rank);
	return table;
}


export const PlayerListTableFromState = (state) => {
	let table = Object.keys(state.players).map(k => {
		let p = state.players[k];
		let totals = state.settings.overall ?
			p.overallTotals :
			VAL.Setting.Lap[state.settings.lap].key==='ALL' ?
				p.combinedTotals.filter(c => c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0] :
				p.totals.filter(c => c.laps===VAL.Setting.Lap[state.settings.lap].key && c.skips===state.settings.skips && c.upgrades===state.settings.upgrades)[0];
		let player = { id:k, name:p.name, time:0, fields:{} };
		player.fields = { pts:FormatTotalPoints(totals.pts), time:FormatTotalTime(Math.floor(totals.time)) };
		player.time = totals.time;
		return player;
	});
	table = table.filter(t => t.time > 0);
	table.sort((a,b) => a.name.localeCompare(b.name));
	return table;
}


export const PlayerTableFromState = (state) => {
	const times = state.settings.overall ?
		state.runs.filter(t => t.player===state.page) :
		state.runs.filter(t => t.player===state.page && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
	let tracks = Object.keys(state.levels).map(t => ({ id:t, name:state.levels[t].name, data:{time1L:0,pts1L:0,rank1L:0,time3L:0,pts3L:0,rank3L:0}, fields:{} }) );
	times.forEach(t => {
		let p = tracks.filter(p => p.id===t.level)[0];
		p.data[`time${t.laps}`] += t.time;
		p.data[`pts${t.laps}`] += t.points;
		p.data[`rank${t.laps}`] += t.rank;
	});
	tracks.forEach(t => {
		t.fields = {
			time1L:FormatTime(t.data.time1L),
			pts1L:FormatPoints(t.data.pts1L),
			rank1L:t.data.rank1L,
			time3L:FormatTime(t.data.time3L),
			pts3L:FormatPoints(t.data.pts3L),
			rank3L:t.data.rank3L
		}
	});
	const levels = Object.keys(VAL.Id.Level).map(k => VAL.Id.Level[k].abbr);
	tracks.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
	return tracks;
}