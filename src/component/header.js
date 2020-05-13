import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useDispatch } from 'react-redux';
import LapIcon from '../element/lap-icon';
import Actions from '../state/action';

export default () => {
	//const refreshable = useSelector(state => state.settings.refreshable);
	const dispatch = useDispatch();
	const cycleLap = () => {
		dispatch(Actions.cycleLapSetting());
		dispatch(Actions.updateTable());
		dispatch(Actions.updateCtxPan());
	};

	return (
		<header>
			<Link to='/' className='logo'>RacerRank</Link>
			<nav>
				<a onClick={cycleLap}><LapIcon/></a>
				<Link to={VAL.Routes.RANKING}>Ranking</Link>
				<Link to={VAL.Routes.TRACKLIST}>Tracks</Link>
				<Link to={VAL.Routes.PLAYERLIST}>Racers</Link>
			</nav>
		</header>
	);
}