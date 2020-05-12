import VAL from './const';
import { FormatTime, FormatTotalTime, FormatPoints, FormatTotalPoints } from '../module/format';


export const RankingTableFromState = (state) => {
	let table = Object.keys(state.players).map(k => {
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

	let sort = VAL.Setting.Lap[state.settings.lap].key;
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

	return table;
}


export const TrackListTableFromState = (state) => {
	let table = Object.keys(state.levels).map(k => {
		let t = state.levels[k];
		let track = { id:k, name:t.name, fields:{} };
		track.fields.best3L = FormatTime(t.best3L);
		track.fields.best1L = FormatTime(t.best1L);
		return track;
	});
	const levels = Object.keys(VAL.Id.Level).map(k => VAL.Id.Level[k].abbr);
	table.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
	return table;
}


export const TrackTableFromState = (state) => {
	const times = state.runs.filter(t => t.level === state.page);
	let table = [];
	times.forEach(t => {
		table = table.filter(p => p.id!==t.player);
		table.push({
			id:t.player,
			name:state.players[t.player].name,
			sort1L:0,
			sort3L:0,
			sortALL:0,
			time1L:0,
			time3L:0,
			timeALL:0,
			fields:{},
			data:{}
		})
	});
	times.forEach(t => {
		let p = table.filter(p => p.id===t.player)[0];
		p[`sort${t.cat}`] = t.points;
		p[`time${t.cat}`] = t.time;
		p.data[`time${t.cat}`] = FormatTime(t.time,'seconds');
		p.data[`pts${t.cat}`] = FormatPoints(t.points);
	});
	table.forEach(t => {
		t.sortALL = t.sort3L+t.sort1L;
		t.timeALL = t.time3L+t.time1L;
		t.data.timeALL = FormatTime(t.time3L+t.time1L);
		t.data.ptsALL = FormatPoints(t.sort3L+t.sort1L);
	});

	let sort = VAL.Setting.Lap[state.settings.lap].key;
	table = table.filter(t => t[`time${sort}`] > 0);
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
	return table;
}


export const PlayerListTableFromState = (state) => {
	let sort = VAL.Setting.Lap[state.settings.lap].key;
	let table = Object.keys(state.players).map(k => {
		let p = state.players[k];
		let player = { id:k, name:p.name, time:0, fields:{} };
		player.fields[`pts${sort}`] = FormatTotalPoints(p[`pts${sort}`]);
		player.fields[`time${sort}`] = FormatTotalTime(Math.floor(p[`time${sort}`]));
		player.time = p[`time${sort}`];
		return player;
	});
	table = table.filter(t => t.time > 0);
	table.sort((a,b) => a.name.localeCompare(b.name));
	return table;
}


export const PlayerTableFromState = (state) => {
	const times = state.runs.filter(t => t.player === state.page);
	
	let tracks = Object.keys(state.levels).map(t => ({ id:t, name:state.levels[t].name, fields:{} }) );
	times.forEach(t => {
		let p = tracks.filter(p => p.id===t.level)[0];
		p.fields[`time${t.cat}`] = FormatTime(t.time);
		p.fields[`pts${t.cat}`] = FormatPoints(t.points);
	});
	const levels = Object.keys(VAL.Id.Level).map(k => VAL.Id.Level[k].abbr);
	tracks.sort((a,b) => levels.indexOf(a.id) - levels.indexOf(b.id));
	return tracks;
}