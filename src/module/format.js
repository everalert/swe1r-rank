import React from 'react';
import VAL from '../state/const';
import Numeral from 'numeral';
import Moment from 'moment';
import MomentDurationFormat from 'moment-duration-format';
MomentDurationFormat(Moment);

const regex = /^(.+)(\.\d+)$/;

const SplitTimeDecimal = (input) => {
	let result = input.match(regex);
	return <span className='time-format'><span className='whole'>{result[1]}</span><span className='decimal'>{result[2]}</span></span>;
}
const SplitPointsDecimal = (input) => {
	let result = input.match(regex);
	return <span className='points-format'><span className='whole'>{result[1]}</span><span className='decimal'>{result[2]}</span></span>;
}

export const FormatTime = (time) => {
	return time > 0 ? SplitTimeDecimal(Moment.duration(time,'seconds').format(VAL.Setting.Format.Time,{trim:false})) : VAL.Setting.Fallback.Time;
}

export const FormatTotalTime = (time) => {
	return time > 0 ? Moment.duration(time,'seconds').format(VAL.Setting.Format.TotalTime,{trim:false}) : VAL.Setting.Fallback.TotalTime;
}

export const FormatFullTotalTime = (time) => {
	return time > 0 ? SplitTimeDecimal(Moment.duration(time,'seconds').format(VAL.Setting.Format.TotalTimeFull,{trim:false})) : VAL.Setting.Fallback.TotalTime;
}

export const FormatPoints = (points) => {
	return points > 0 ? SplitPointsDecimal(Numeral(points).format(VAL.Setting.Format.Points)) : VAL.Setting.Fallback.Points;
}

export const FormatTotalPoints = (points) => {
	return points > 0 ? SplitPointsDecimal(Numeral(points).format(VAL.Setting.Format.TotalPoints)) : VAL.Setting.Fallback.TotalPoints;
}

export const FormatRunsPosted = (runs, max) => {
	return <span className='runs-format'><span className='runs-done'>{runs}</span><span className='runs-max'>/{max}</span></span>;
}

export const FormatIdFromPlayer = (name) => {
	return name.toLowerCase().replace(' ','_');
}

export const FormatCategoryTitleFromSettings = (settings) => {
	const strings = [];
	if (settings.overall)
		strings.push('Overall');
	else {
		strings.push(`${!settings.skips?'No ':''}Skips`);
		strings.push(`${!settings.upgrades?'No ':''}Upgrades`);
	}
	if (VAL.Setting.Lap[settings.lap].key!=='ALL')
		strings.push(VAL.Setting.Lap[settings.lap].name);
	return strings.join(', ');
}