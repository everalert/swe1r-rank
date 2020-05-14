import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useDispatch } from 'react-redux';
import LapIcon from '../element/lap-icon';
import SkipsIcon from '../element/skips-icon';
import UpgradesIcon from '../element/upgrades-icon';
import Actions from '../state/action';

export default () => {
	//const refreshable = useSelector(state => state.settings.refreshable);
	const dispatch = useDispatch();
	const cycleLap = () => {
		dispatch(Actions.cycleLapSetting());
		dispatch(Actions.updateTable());
		dispatch(Actions.updateCtxPan());
	};
	const toggleSkips = () => {
		dispatch(Actions.toggleSkipsSetting());
		dispatch(Actions.updateTable());
		dispatch(Actions.updateCtxPan());
	};
	const toggleUpgrades = () => {
		dispatch(Actions.toggleUpgradesSetting());
		dispatch(Actions.updateTable());
		dispatch(Actions.updateCtxPan());
	};

	return (
		<header>
			<Link to='/' className='logo'>RacerRank</Link>
			<nav>
				<Link to={VAL.Routes.RANKING}>Ranking</Link>
				<Link to={VAL.Routes.TRACKLIST}>Tracks</Link>
				<Link to={VAL.Routes.PLAYERLIST}>Racers</Link>
				<a className="icon" onClick={toggleUpgrades}><UpgradesIcon/></a>
				<a className="icon" onClick={toggleSkips}><SkipsIcon/></a>
				<a className="icon" onClick={cycleLap}><LapIcon/></a>
			</nav>
		</header>
	);
}