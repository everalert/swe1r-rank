import React from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';

export default () => {
	const skips = useSelector(state => state.settings.skips);
	const overall = useSelector(state => state.settings.overall);
	return (()=><SVG className={`${overall?'overall-disabled':''} ${!skips?'disabled':''}`} src={require(`../img/icon-cat-SK.svg`)} />)();
}