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
			sort:totals.pts,
			time:totals.time,
			fields:{
				pts:FormatTotalPoints(totals.pts),
				time:FormatTotalTime(totals.time)
			}
		};
		return player;
	});

	table.sort((a,b) => a.time - b.time);
	table.sort((a,b) => b.sort - a.sort);
	let rank = 0, rankStreak = 0;
	let last = null;
	table = table.filter(t => t.time > 0);
	table.forEach(item => {
		rankStreak++;
		if (item.sort !== last) {
			rank += rankStreak;
			rankStreak = 0;
		}
		item.rank = rank;
		last = item.sort;
	});

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
		VAL.Setting.Lap[state.settings.lap].key==='ALL' ?
			state.runs.filter(t => t.level===state.page && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades) :
			state.runs.filter(t => t.level===state.page && t.laps===VAL.Setting.Lap[state.settings.lap].key && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
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
				sort:t.points,
				time:t.time,
				fields:{ pts:FormatPoints(t.points), time:FormatTime(t.time) }
			});
		}
	});

	let sort = VAL.Setting.Lap[state.settings.lap].key;
	table = table.filter(t => t.time > 0);
	table.sort((a,b) => a.time - b.time);
	table.sort((a,b) => b.sort - a.sort);
	let rank = 0, rankStreak = 0;
	let last = null;
	table.forEach(item => {
		rankStreak++;
		if (item.sort !== last) {
			rank += rankStreak;
			rankStreak = 0;
		}
		item.rank = rank;
		last = item.sort;
	});
	return table;
}


export const PlayerListTableFromState = (state) => {
	let sort = VAL.Setting.Lap[state.settings.lap].key;
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
		VAL.Setting.Lap[state.settings.lap].key==='ALL' ?
			state.runs.filter(t => t.player===state.page && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades) :
			state.runs.filter(t => t.player===state.page && t.laps===VAL.Setting.Lap[state.settings.lap].key && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
	let tracks = Object.keys(state.levels).map(t => ({ id:t, name:state.levels[t].name, data:{time1L:0,pts1L:0,time3L:0,pts3L:0}, fields:{} }) );
	times.forEach(t => {
		let p = tracks.filter(p => p.id===t.level)[0];
		p.data[`time${t.laps}`] += t.time;
		p.data[`pts${t.laps}`] += t.points;
	});
	tracks.forEach(t => {
		t.fields = {
			time1L:FormatTime(t.data.time1L),
			pts1L:FormatPoints(t.data.pts1L),
			time3L:FormatTime(t.data.time3L),
			pts3L:FormatPoints(t.data.pts3L)
		}
	});
	const levels = Object.keys(VAL.Id.Level).map(k => VAL.Id.Level[k].abbr);
	tracks.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
	return tracks;
}