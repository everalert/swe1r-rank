import VAL from './const';
import { FormatTime, FormatFullTotalTime, FormatRunsPosted } from '../module/format';
import { TimeNeededForPoints } from '../module/points';
import { NewCtxItem, NewCtxHeading, NewCtxText } from '../module/ctxpan';
import { DevFormatCategoryMultiplier } from '../module/debug';


export const RankingCtxPanFromState = (state) => {
	let items = [];
	const laps = 'ALL';
	const runs = state.runs.filter(t => !t.overall && (laps==='ALL'?t.laps!=='ALL':t.laps===laps) && (state.settings.overall || (t.skips===state.settings.skips && t.upgrades===state.settings.upgrades)));
	let players = [];
	runs.forEach(r => { if (players.indexOf(r.player)<0) players.push(r.player) });
	let playerCount = players.length;
	let runCount = runs.length;
	items.push(NewCtxHeading('Stats'));
	items.push(NewCtxItem('Players',playerCount));
	items.push(NewCtxItem('Runs',runCount));
	return items;
}


export const TrackListCtxPanFromState = (state) => {
	let items = [];
	let totals = Object.keys(state.levels).reduce((v,k) => {
		let t = state.levels[k];
		const bests = state.settings.overall ?
			t.bests :
			t.bests.filter(t => t.skips===state.settings.skips && t.upgrades===state.settings.upgrades);
		bests.forEach(b => {
			v[`time${b.laps}`] += b.time;
			v.timeT += b.time;
		});
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
	const bests = state.levels[page].bests;
	const debugInfo = state.settings.debugMode && state.settings.debugInfo;
	let items = [];
	if (Object.keys(state.levels).indexOf(page)>=0) {
		if (lap === '1L') {
			const best = bests.filter(t => t.laps==='1L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades)[0];
			const time = best.time || 3599.99;
			const scale = best.scale;
			items.push(NewCtxHeading('1-Lap Milestones'));
			if (!state.settings.overall) {
				items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,scale,90))));
				items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,scale,50))));
				items.push(NewCtxItem('Baseline',FormatTime(TimeNeededForPoints(time,scale))));
				if (debugInfo) {
					items.push(NewCtxItem('Category Multiplier', DevFormatCategoryMultiplier(best.scale)));
					items.push(NewCtxItem('90pt Time Window', FormatTime(TimeNeededForPoints(time,scale,90)-time)));
				}
			} else {
				items.push(NewCtxText('A long time.'))
			}
		} else {
			const best = bests.filter(t => t.laps==='3L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades)[0];
			const time = best.time || 3599.99;
			const scale = best.scale;
			items.push(NewCtxHeading('3-Lap Milestones'));
			if (!state.settings.overall) {
				items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,scale,90))));
				items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,scale,50))));
				items.push(NewCtxItem('Baseline',FormatTime(TimeNeededForPoints(time,scale))));
				if (debugInfo) {
					items.push(NewCtxItem('Category Multiplier', DevFormatCategoryMultiplier(best.scale)));
					items.push(NewCtxItem('90pt Time Window', FormatTime(TimeNeededForPoints(time,scale,90)-time)));
				}
			} else {
				items.push(NewCtxText('A long time.'))
			}
		}
	}
	return items;
}


export const PlayerListCtxPanFromState = (state) => {
	let items = [];
	const laps = 'ALL';
	const runs = state.runs.filter(t => !t.overall && (laps==='ALL'?t.laps!=='ALL':t.laps===laps) && (state.settings.overall || (t.skips===state.settings.skips && t.upgrades===state.settings.upgrades)));
	let players = [];
	runs.forEach(r => { if (players.indexOf(r.player)<0) players.push(r.player) });
	let playerCount = players.length;
	let runCount = runs.length;
	items.push(NewCtxHeading('Stats'));
	items.push(NewCtxItem('Players',playerCount));
	items.push(NewCtxItem('Runs',runCount));
	return items;
}


export const PlayerCtxPanFromState = (state) => {
	const page = state.panel.section ? state.panel.page : state.page;
	const maxRuns = Object.keys(VAL.Id.Level).length * (state.settings.overall ? Math.pow(2,3) : Math.pow(2,1));

	const runs = state.runs.filter(t => t.player===state.page && (t.laps==='3L' || t.laps==='1L') && ((state.settings.overall) || (!t.overall && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades)));
	let items = [];
	let totals = runs.reduce((v,t) => {
		if (t.player === page) {
			v[`time${t.laps}`] += t.time;
			v.timeT += t.time;
			if (t.points >= 50 && t.points < 90) v.pt50++;
			if (t.points >= 90 && t.points < 100) v.pt90++;
			if (t.points === 100) v.pt100++;
			v.runT++;
		}
		return v;
	}, {timeT:0, time3L:0, time1L:0, runT:0, pt50:0, pt90:0, pt100:0});
	items.push(NewCtxItem('Runs',FormatRunsPosted(totals.runT,maxRuns)));
	items.push(NewCtxHeading('Run Summary'));
	{ totals.pt100 && items.push(NewCtxItem('✦ 100',totals.pt100)); }
	{ totals.pt90 && items.push(NewCtxItem('✦ 90+',totals.pt90)); }
	{ totals.pt50 && items.push(NewCtxItem('✦ 50+',totals.pt50)); }
	items.push(NewCtxHeading('Time Totals'));
	items.push(NewCtxItem('Overall',FormatFullTotalTime(totals.timeT)));
	items.push(NewCtxItem('1-Lap',FormatFullTotalTime(totals.time1L)));
	items.push(NewCtxItem('3-Lap',FormatFullTotalTime(totals.time3L)));
	return items;
}