import React from 'react';
import { useSelector } from 'react-redux';
import TrackList from '../element/table-tracklist'

export default () => {
	const data = useSelector(state => state.table);
	return (
		<main>
			<h1>All</h1>
			<h2>Tracks</h2>
			<div className='side-bar'><div className='side-panel'>CONTEXT PANEL</div></div>
			<TrackList data={data}/>
		</main>
	);
}