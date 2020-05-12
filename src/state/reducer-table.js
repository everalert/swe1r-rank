import VAL from './const';
import { FormatTime, FormatTotalTime, FormatFullTotalTime, FormatPoints, FormatTotalPoints, FormatRunsPosted, FormatIdFromPlayer } from '../module/format';

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
	return [];
}

export const PlayerListTableFromState = (state) => {
	let sort = VAL.Setting.Lap[state.settings.lap].key;
	let table = Object.keys(state.players).map(k => {
		let p = state.players[k];
		let player = { id:k, name:p.name, fields:{} };
		player.fields[`pts${sort}`] = FormatTotalPoints(p[`pts${sort}`]);
		player.fields[`time${sort}`] = FormatTotalTime(Math.floor(p[`time${sort}`]));
		return player;
	});
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