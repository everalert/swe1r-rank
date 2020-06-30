import React from 'react';
import Trophy from './trophy.js'

export default (props) => {
	return (
		<div class="trophy-panel">
			<Trophy rank={props.o.rank} points={props.o.pts} overall={true} />
			{ props.c.map(c => <Trophy rank={c.rank} points={c.pts} upgrades={c.upgrades} skips={c.skips} />)}
		</div>
	);
}