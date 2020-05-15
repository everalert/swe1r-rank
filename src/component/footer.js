import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useDispatch } from 'react-redux';
import { MdLoop, MdLightbulbOutline } from 'react-icons/md';
import Actions from '../state/action';

export default () => {
	const dispatch = useDispatch();
	const toggleTheme = ()=>dispatch(Actions.toggleTheme());
	const reload = () => dispatch(Actions.markLoading());
	return (
			<footer>
				<nav>
					<Link to={VAL.Routes.ABOUT}>About</Link>
					<Link to={VAL.Routes.CHANGELOG}>Changelog</Link>
					<button onClick={reload} className='icon'><MdLoop/></button>
					<button onClick={toggleTheme} className='icon'><MdLightbulbOutline/></button>
				</nav>
			</footer>
	);
}