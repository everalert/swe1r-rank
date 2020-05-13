import VAL from './const';
import { FormatTime, FormatFullTotalTime, FormatRunsPosted } from '../module/format';
import { TimeNeededForPoints } from '../module/points';
import { NewCtxItem, NewCtxHeading, /*NewCtxText*/ } from '../module/ctxpan';


export const RankingCtxPanFromState = (state) => {
	let items = [];
	const lap = VAL.Setting.Lap[state.settings.lap].key;
	let playerCount = lap === 'ALL' ? Object.keys(state.players).length : Object.keys(state.players).filter(k => state.players[k][`time${lap}`] > 0).length;
	let runCount = lap === 'ALL' ? state.runs.length : state.runs.filter(r => r.cat === lap).length;
	items.push(NewCtxHeading('Stats'));
	items.push(NewCtxItem('Players',playerCount));
	items.push(NewCtxItem('Runs',runCount));
	return items;
}


export const TrackListCtxPanFromState = (state) => {
	let items = [];
	let totals = Object.keys(state.levels).reduce((v,t) => {
		v.time1L += state.levels[t].best1L;
		v.time3L += state.levels[t].best3L;
		v.timeT += state.levels[t].best1L + state.levels[t].best3L;
		return v;
	}, {timeT:0, time3L:0, time1L:0});
	items.push(NewCtxHeading('Record Totals'));
	items.push(NewCtxItem('Overall',FormatFullTotalTime(totals.timeT)));
	items.push(NewCtxItem('1-Lap',FormatFullTotalTime(totals.time1L)));
	items.push(NewCtxItem('3-Lap',FormatFullTotalTime(totals.time3L)));
	return items;
}


export const TrackCtxPanFromState = (state) => {
	const page = state.panel.section ? state.panel.page : state.page;
	const lap = VAL.Setting.Lap[state.settings.lap].key;
	let items = [];
	if (Object.keys(state.levels).indexOf(page)>=0) {
		if (lap === 'ALL' || lap === '3L') {
			const time = state.levels[page].best3L;
			items.push(NewCtxHeading('3-Lap Milestones'));
			items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,90))));
			items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,50))));
			items.push(NewCtxItem('Baseline',FormatTime(TimeNeededForPoints(time))));
		}
		if (lap === 'ALL' || lap === '1L') {
			const time = state.levels[page].best1L;
			items.push(NewCtxHeading('1-Lap Milestones'));
			items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,90))));
			items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,50))));
			items.push(NewCtxItem('Baseline',FormatTime(TimeNeededForPoints(time))));
		}
	}
	return items;
}


export const PlayerListCtxPanFromState = (state) => {
	let items = [];
	const lap = VAL.Setting.Lap[state.settings.lap].key;
	let playerCount = lap === 'ALL' ? Object.keys(state.players).length : Object.keys(state.players).filter(k => state.players[k][`time${lap}`] > 0).length;
	let runCount = lap === 'ALL' ? state.runs.length : state.runs.filter(r => r.cat === lap).length;
	items.push(NewCtxHeading('Stats'));
	items.push(NewCtxItem('Players',playerCount));
	items.push(NewCtxItem('Runs',runCount));
	return items;
}


export const PlayerCtxPanFromState = (state) => {
	const page = state.panel.section ? state.panel.page : state.page;
	let items = [];
	let totals = state.runs.reduce((v,t) => {
		if (t.player === page) {
			v[`time${t.cat}`] += t.time;
			v.timeT += t.time;
			if (t.points >= 50 && t.points < 90) v.pt50++;
			if (t.points >= 90 && t.points < 100) v.pt90++;
			if (t.points === 100) v.pt100++;
			v.runT++;
		}
		return v;
	}, {timeT:0, time3L:0, time1L:0, runT:0, pt50:0, pt90:0, pt100:0});
	items.push(NewCtxItem('Runs Posted',FormatRunsPosted(totals.runT,50)));
	items.push(NewCtxHeading('Run Summary'));
	items.push(NewCtxItem('100 Points',totals.pt100));
	items.push(NewCtxItem('90+ Points',totals.pt90));
	items.push(NewCtxItem('50+ Points',totals.pt50));
	items.push(NewCtxHeading('Time Totals'));
	items.push(NewCtxItem('Overall',FormatFullTotalTime(totals.timeT)));
	items.push(NewCtxItem('1-Lap',FormatFullTotalTime(totals.time1L)));
	items.push(NewCtxItem('3-Lap',FormatFullTotalTime(totals.time3L)));
	return items;
}