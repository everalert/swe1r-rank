import React from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import VAL from '../state/const';

export default () => {
	const lap = useSelector(state => state.settings.lap);
	const icons = VAL.Setting.Lap.map(l => ((() => <SVG src={require(`../img/icon-lap-${l.key}.svg`)} />)()));
	return icons[lap];
}