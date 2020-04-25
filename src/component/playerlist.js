import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlayerList from '../element/table-playerlist';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';

export default () => {
	const data = useSelector(state => state.table);

	const dispatch = useDispatch();
	dispatch(Actions.resetCtxPan());

	return (
		<main>
			<h1>All</h1>
			<h2>Players</h2>
			<ContextPanel/>
			<PlayerList data={data}/>
		</main>
	);
}