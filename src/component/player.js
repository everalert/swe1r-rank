import React from 'react';
import { useSelector } from 'react-redux';
import Player from '../element/table-player';

export default () => {
	const data = useSelector(state => state.table);
	const player = useSelector(state => state.page);
	const playerName = useSelector(state => state.players[player].name);
	return (
		<main>
			<h1>Player</h1>
			<h2>{playerName}</h2>
			<div className='side-bar'><div className='side-panel'>CONTEXT PANEL</div></div>
			<Player data={data}/>
		</main>
	);
}