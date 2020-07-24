import React from 'react';
import Trophy from './trophy.js'

export default (props) => {
	const panels = props.totals.filter(c => c.laps==='ALL');
	return (
		<div class="trophy-panel">
			{ panels.map(c => <Trophy overall={c.overall} rank={c.rank} points={c.pts} upgrades={c.upgrades} skips={c.skips} />)}
		</div>
	);
}