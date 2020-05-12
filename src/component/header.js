import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useDispatch } from 'react-redux';
import LapIcon from '../element/lap-icon';
import Actions from '../state/action';

export default () => {
	//const refreshable = useSelector(state => state.settings.refreshable);
	const dispatch = useDispatch();
	const cycleLap = () => dispatch(Actions.cycleLapSetting());

	return (
		<header>
			<Link to='/' className='logo'>RacerRank</Link>
			<nav>
				<button onClick={cycleLap}><LapIcon/></button>
				<Link to={VAL.Routes.RANKING}><button>Ranking</button></Link>
				<Link to={VAL.Routes.TRACKLIST}><button>Tracks</button></Link>
				<Link to={VAL.Routes.PLAYERLIST}><button>Racers</button></Link>
			</nav>
		</header>
	);
}