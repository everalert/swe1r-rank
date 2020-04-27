import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Player from '../element/table-player';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';

export default () => {
	const data = useSelector(state => state.table);
	const player = useSelector(state => state.page);
	const playerName = useSelector(state => state.players[player].name);

	const dispatch = useDispatch();
	dispatch(Actions.setCtxPanToPlayer(player));

	return (
		<main>
			<h1>Player</h1>
			<h2>{playerName}</h2>
			<ContextPanel/>
			<Player player={player} data={data}/>
		</main>
	);
}