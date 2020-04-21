import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdLoop } from 'react-icons/md';
import Actions from '../state/action';

export default () => {
	const dark = useSelector(state => state.settings.dark);
	//const refreshable = useSelector(state => state.settings.refreshable);
	const dispatch = useDispatch();
	const reload = ()=>dispatch(Actions.markLoading())
	const gotoRanking = ()=>dispatch(Actions.gotoRanking())
	const gotoTrackList = ()=>dispatch(Actions.gotoTrackList())
	const gotoPlayerList = ()=>dispatch(Actions.gotoPlayerList())

	return (
		<header>
			<div className='logo'><img src={`img/${!dark?'logo':'logo-dark'}.png`} alt='RacerRank' /></div>
			<nav>
				<button onClick={gotoRanking}>Ranking</button>
				<button onClick={gotoTrackList}>Tracks</button>
				<button onClick={gotoPlayerList}>Players</button>
				<button onClick={reload} className='icon'><MdLoop/></button>
			</nav>
		</header>
	);
}