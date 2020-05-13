import React from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import VAL from '../state/const';

export default () => {
	const upgrades = useSelector(state => state.settings.upgrades);
	return (()=><SVG className={!upgrades?'disabled':''} src={require(`../img/icon-cat-UP.svg`)} />)();
}