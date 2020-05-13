import React from 'react';
import { useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import VAL from '../state/const';

export default () => {
	const skips = useSelector(state => state.settings.skips);
	return (()=><SVG className={!skips?'disabled':''} src={require(`../img/icon-cat-SK.svg`)} />)();
}