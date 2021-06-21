import React from 'react';
import Trophy from './trophy.js';
import '../css/tilt.css';
import '../css/trophy-panel.css';

export default (props) => {
	const panels = props.totals.filter(c => c.laps==='ALL');
	return (
		<div className="trophy-panel">
			{ panels.map((c,i) => <Trophy overall={c.overall} rank={c.rank} points={c.pts} upgrades={c.upgrades} skips={c.skips} key={i} />)}
		</div>
	);
}