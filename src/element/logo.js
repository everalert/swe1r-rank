import React from 'react';
import SVG from 'react-inlinesvg';

export default () => {
	return (() => <SVG src={require(`../img/logo.svg`)} /> )();
}