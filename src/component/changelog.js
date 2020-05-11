import React from 'react';
import VAL from '../state/const';
import Changelog from '../state/changelog';

export default () => {
	return (<main className="changelog">
		<h1>RacerRank</h1>
		<h2>ChangeLog</h2>
		{ Object.keys(Changelog).sort().reverse().map(major => {
			const output = [];
			Object.keys(Changelog[major]).sort().reverse().map(minor => {
				output.push(<h4>v{major}.{minor} &ndash; {Changelog[major][minor].Release.toLocaleDateString()}</h4>);
				output.push(<ul>{Changelog[major][minor].Notes.map(n => <li>{n}</li>)}</ul>);
			})
			return output;
		}) }
	</main>)
};