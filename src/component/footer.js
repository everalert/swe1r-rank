import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useSelector, useDispatch } from 'react-redux';
import { MdLoop, MdLightbulbOutline } from 'react-icons/md';
import Actions from '../state/action';

export default () => {
	const dev = useSelector(state => state.settings.developerMode);
	const dispatch = useDispatch();
	const toggleTheme = ()=>dispatch(Actions.toggleTheme());
	const reload = () => dispatch(Actions.markLoading());
	return (
			<footer>
				<nav>
					{ dev && <Link to={VAL.Routes.DEVELOPER}>Dev</Link> }
					<Link to={VAL.Routes.ABOUT}>About</Link>
					<Link to={VAL.Routes.CHANGELOG}>Changelog</Link>
					<button onClick={reload} className='icon'><MdLoop/></button>
					<button onClick={toggleTheme} className='icon'><MdLightbulbOutline/></button>
				</nav>
			</footer>
	);
}