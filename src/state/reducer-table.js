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