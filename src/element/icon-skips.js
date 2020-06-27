import React from 'react';
import SVG from 'react-inlinesvg';

export default (props) => {
	return (()=><SVG className={props.className} src={require(`../img/icon-cat-SK.svg`)} />)();
}