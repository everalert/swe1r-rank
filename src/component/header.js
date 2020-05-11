import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useDispatch } from 'react-redux';
import { MdLoop } from 'react-icons/md';
import Actions from '../state/action';

export default () => {
	//const refreshable = useSelector(state => state.settings.refreshable);
	const dispatch = useDispatch();
	const reload = () => dispatch(Actions.markLoading());

	return (
		<header>
			<Link to='/' className='logo'>RacerRank</Link>
			<nav>
				<Link to={VAL.Routes.RANKING}><button>Ranking</button></Link>
				<Link to={VAL.Routes.TRACKLIST}><button>Tracks</button></Link>
				<Link to={VAL.Routes.PLAYERLIST}><button>Players</button></Link>
				<button onClick={reload} className='icon'><MdLoop/></button>
			</nav>
		</header>
	);
}