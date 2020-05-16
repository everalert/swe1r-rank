import VAL from './const';
import { FormatTime, FormatFullTotalTime, FormatRunsPosted } from '../module/format';
import { TimeNeededForPoints } from '../module/points';
import { NewCtxItem, NewCtxHeading, NewCtxText } from '../module/ctxpan';
import { DevFormatCategoryMultiplier } from '../module/developer';


export const RankingCtxPanFromState = (state) => {
	let items = [];
	let runs = state.settings.overall ? 
		state.runs :
		VAL.Setting.Lap[state.settings.lap].key === 'ALL' ?
			state.runs.filter(r => r.skips===state.settings.skips && r.upgrades===state.settings.upgrades) :
			state.runs.filter(r => r.laps===VAL.Setting.Lap[state.settings.lap].key && r.skips===state.settings.skips && r.upgrades===state.settings.upgrades);
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
	const devShow = state.settings.developerMode && state.settings.developerShow;
	let items = [];
	if (Object.keys(state.levels).indexOf(page)>=0) {
		if (lap === 'ALL' || lap === '3L') {
			const best = bests.filter(t => t.laps==='3L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades)[0];
			const time = best.time || 3599.99;
			const scale = best.scale;
			items.push(NewCtxHeading('3-Lap Milestones'));
			if (!state.settings.overall) {
				items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,scale,90))));
				items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,scale,50))));
				items.push(NewCtxItem('Baseline',FormatTime(TimeNeededForPoints(time,scale))));
				if (devShow) {
					items.push(NewCtxItem('Category Multiplier', DevFormatCategoryMultiplier(best.scale)));
					items.push(NewCtxItem('90pt Time Window', FormatTime(TimeNeededForPoints(time,scale,90)-time)));
				}
			} else {
				items.push(NewCtxText('A long time.'))
			}
		}
		if (lap === 'ALL' || lap === '1L') {
			const best = bests.filter(t => t.laps==='1L' && t.skips===state.settings.skips && t.upgrades===state.settings.upgrades)[0];
			const time = best.time || 3599.99;
			const scale = best.scale;
			items.push(NewCtxHeading('1-Lap Milestones'));
			if (!state.settings.overall) {
				items.push(NewCtxItem('90 Points',FormatTime(TimeNeededForPoints(time,scale,90))));
				items.push(NewCtxItem('50 Points',FormatTime(TimeNeededForPoints(time,scale,50))));
				items.push(NewCtxItem('Baseline',FormatTime(TimeNeededForPoints(time,scale))));
				if (devShow) {
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
	let runs = state.settings.overall ? 
		state.runs :
		VAL.Setting.Lap[state.settings.lap].key === 'ALL' ?
			state.runs.filter(r => r.skips===state.settings.skips && r.upgrades===state.settings.upgrades) :
			state.runs.filter(r => r.laps===VAL.Setting.Lap[state.settings.lap].key && r.skips===state.settings.skips && r.upgrades===state.settings.upgrades);
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
	let runs = state.settings.overall ? 
		state.runs.filter(r => r.player===page) :
		VAL.Setting.Lap[state.settings.lap].key === 'ALL' ?
			state.runs.filter(r => r.player===page && r.skips===state.settings.skips && r.upgrades===state.settings.upgrades) :
			state.runs.filter(r => r.player===page && r.laps===VAL.Setting.Lap[state.settings.lap].key && r.skips===state.settings.skips && r.upgrades===state.settings.upgrades);
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
	items.push(NewCtxItem('Runs Posted',FormatRunsPosted(totals.runT,maxRuns)));
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