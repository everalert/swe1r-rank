import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Track from '../element/table-track';
import PageSelector from '../element/page-selector';
import Actions from '../state/action';

export default () => {
	const dispatch = useDispatch();
	const sort = (sorting) => dispatch(Actions.sortTrack(sorting.value));
	const menu = useSelector(state => state.menu);
	const sorting = useSelector(state => state.trackTab);
	const data = useSelector(state => state.table);
	const track = useSelector(state => state.page);
	const trackName = useSelector(state => state.levels[track].name);
	return (
		<main>
			<h1>Track</h1>
			<h2>{trackName}</h2>
			<PageSelector onChangeHandler={sort} menu={menu} initial={sorting} />
			<div className='side-bar'><div className='side-panel'>CONTEXT PANEL</div></div>
			<Track data={data}/>
		</main>
	);
}