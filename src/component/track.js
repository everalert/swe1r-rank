import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Track from '../element/table-track';
import PageSelector from '../element/page-selector';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';

export default () => {
	const dispatch = useDispatch();
	const sort = (sorting) => {
		dispatch(Actions.sortTrack(sorting.value));
		dispatch(Actions.setCtxPanToTrack(track));
	};
	const menu = useSelector(state => state.menu);
	const sorting = useSelector(state => state.trackTab);
	const data = useSelector(state => state.table);
	const track = useSelector(state => state.page);
	const trackName = useSelector(state => state.levels[track].name);

	dispatch(Actions.setCtxPanToTrack(track));

	return (
		<main>
			<h1>Track</h1>
			<h2>{trackName}</h2>
			<PageSelector onChangeHandler={sort} menu={menu} initial={sorting} />
			<ContextPanel/>
			<Track data={data}/>
		</main>
	);
}