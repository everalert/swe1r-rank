import React from 'react';
import Changelog from '../state/changelog';

export default () => {
	const ProcessNotes = (notes, key) => {
		return <ul key={key}>{
			notes.map((n,i) => {
				switch (typeof n) {
					case "string": return <li key={i}>{n}</li>;
					case "object": return Array.isArray(n) ? ProcessNotes(n,i) : null;
					default: return null;
				}
			})
		}</ul>;
	}

	return <main className="changelog">
		<h1>RacerRank</h1>
		<h2>ChangeLog</h2>
		{ Object.keys(Changelog).sort().reverse().map(major => {
			const output = [];
			Object.keys(Changelog[major]).sort().reverse().forEach((minor,i) => {
				output.push(<h4 key={i*2}>v{major}.{minor} &ndash; {Changelog[major][minor].Release.toLocaleDateString()}</h4>);
				output.push(ProcessNotes(Changelog[major][minor].Notes, i*2+1));
			})
			return output;
		}) }
	</main>
};