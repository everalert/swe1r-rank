import React from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';

export default () => {
	const upgrades = useSelector(state => state.settings.upgrades);
	const overall = useSelector(state => state.settings.overall);
	return (()=><SVG className={`${overall?'overall-disabled':''} ${!upgrades?'disabled':''}`} src={require(`../img/icon-cat-UP.svg`)} />)();
}