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
	return SplitTimeDecimal(Moment.duration(time,'seconds').format(VAL.Setting.Format.Time,{trim:false}));
}

export const FormatTotalTime = (time) => {
	return Moment.duration(time,'seconds').format(VAL.Setting.Format.TotalTime,{trim:false})
}

export const FormatFullTotalTime = (time) => {
	return SplitTimeDecimal(Moment.duration(time,'seconds').format(VAL.Setting.Format.TotalTimeFull,{trim:false}))
}

export const FormatPoints = (points) => {
	return SplitPointsDecimal(Numeral(points).format(VAL.Setting.Format.Points));
}

export const FormatTotalPoints = (points) => {
	return SplitPointsDecimal(Numeral(points).format(VAL.Setting.Format.TotalPoints));
}

export const FormatRunsPosted = (runs, max) => {
	return <span className='runs-format'><span className='runs-done'>{runs}</span><span className='runs-max'>/{max}</span></span>;
}

export const FormatIdFromPlayer = (name) => {
	return name.toLowerCase().replace(' ','_');
}