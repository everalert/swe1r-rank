import React from 'react';
import VAL from '../state/const';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
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
		strings.push(<span className="cat-label" key={strings.length}>Overall</span>);
	else {
		strings.push(settings.skips?<span className="cat-label" key={strings.length}>Skips<IoIosCheckmarkCircleOutline className="cat-icon-yes"/></span>:<span className="cat-label" key={strings.length}>No Skips<IoIosCloseCircleOutline className="cat-icon-no"/></span>);
		strings.push(settings.upgrades?<span className="cat-label" key={strings.length}>Upgrades<IoIosCheckmarkCircleOutline className="cat-icon-yes"/></span>:<span className="cat-label" key={strings.length}>No Upgrades<IoIosCloseCircleOutline className="cat-icon-no"/></span>);
	}
	if (VAL.Setting.Lap[settings.lap].key!=='ALL')
		strings.push(<span className="cat-label" key={strings.length}>{VAL.Setting.Lap[settings.lap].name}</span>);

	return <span className="cat-string">{strings.reduce((acc,next,i) => [acc,<span className="cat-sep" key={strings.length+i}>‧</span>,next])}</span>;
}

export const FormatCategoryTitle = (overall, skips, upgrades, lap) => {
	const strings = [];
	if (overall)
		strings.push(<span className="cat-label" key={strings.length}>Overall</span>);
	else {
		strings.push(skips?<span className="cat-label" key={strings.length}>Skips<IoIosCheckmarkCircleOutline className="cat-icon-yes"/></span>:<span className="cat-label" key={strings.length}>No Skips<IoIosCloseCircleOutline className="cat-icon-no"/></span>);
		strings.push(upgrades?<span className="cat-label" key={strings.length}>Upgrades<IoIosCheckmarkCircleOutline className="cat-icon-yes"/></span>:<span className="cat-label" key={strings.length}>No Upgrades<IoIosCloseCircleOutline className="cat-icon-no"/></span>);
	}
	if (VAL.Setting.Lap[lap].key!=='ALL')
		strings.push(<span className="cat-label" key={strings.length}>{VAL.Setting.Lap[lap].name}</span>);

	return <span className="cat-string">{strings.reduce((acc,next,i) => [acc,<span className="cat-sep" key={strings.length+i}>‧</span>,next])}</span>;
}

export const GetLapSettingObj = (key) => {
	return VAL.Setting.Lap.filter(l => l.key===key)[0];
}