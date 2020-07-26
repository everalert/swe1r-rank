import React from 'react';
import Changelog from '../state/changelog';

export default () => {
	return <main className="changelog">
		<h1>RacerRank</h1>
		<h2>ChangeLog</h2>
		{ Object.keys(Changelog).sort().reverse().map(major => {
			const output = [];
			Object.keys(Changelog[major]).sort().reverse().forEach((minor,i) => {
				output.push(<h4 key={i*2}>v{major}.{minor} &ndash; {Changelog[major][minor].Release.toLocaleDateString()}</h4>);
				output.push(<ul key={i*2+1}>{Changelog[major][minor].Notes.map((n,i) => <li key={i}>{n}</li>)}</ul>);
			})
			return output;
		}) }
	</main>
};