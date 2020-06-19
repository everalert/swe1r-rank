import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import SettingsMenu from '../element/menu-settings'

export default () => {
	return (
		<header>
			<Link to='/' className='logo'>RacerRank</Link>
			<nav>
				<Link to={VAL.Routes.RANKING}>Ranking</Link>
				<Link to={VAL.Routes.TRACKLIST}>Tracks</Link>
				<Link to={VAL.Routes.PLAYERLIST}>Racers</Link>
				<SettingsMenu/>
			</nav>
		</header>
	);
}