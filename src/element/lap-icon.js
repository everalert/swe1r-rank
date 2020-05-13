import React from 'react';
import { useSelector } from 'react-redux';
import VAL from '../state/const';
// import { ReactComponent as IconALL } from '../img/icon-lap-overall.svg';
// import { ReactComponent as Icon3L } from '../img/icon-lap-3lap.svg';
// import { ReactComponent as Icon1L } from '../img/icon-lap-1lap.svg';

export default () => {
	const lap = useSelector(state => state.settings.lap);
	return <span>LAPS : {VAL.Setting.Lap[lap].name}</span>
}