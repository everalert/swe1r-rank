import React from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';

export default () => {
	const overall = useSelector(state => state.settings.overall);
	return (()=><SVG className={!overall?'disabled':''} src={require(`../img/icon-cat-ALL.svg`)} />)();
}