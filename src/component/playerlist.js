import React from 'react';
import { useSelector } from 'react-redux';
import PlayerList from '../element/table-playerlist'

export default () => {
	const data = useSelector(state => state.table);
	return (
		<main>
			<h1>All</h1>
			<h2>Players</h2>
			<div className='side-bar'><div className='side-panel'>CONTEXT PANEL</div></div>
			<PlayerList data={data}/>
		</main>
	);
}