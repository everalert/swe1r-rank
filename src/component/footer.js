import React from 'react';
import { useDispatch } from 'react-redux';
import { MdLightbulbOutline } from 'react-icons/md';
import Actions from '../state/action';

export default () => {
	const dispatch = useDispatch();
	const gotoAbout = ()=>dispatch(Actions.gotoAbout());
	const toggleTheme = ()=>dispatch(Actions.toggleTheme());
	return (
		<footer>
			<nav>
				<button onClick={gotoAbout}>About</button>
				<button onClick={toggleTheme} className='icon'><MdLightbulbOutline/></button>
			</nav>
		</footer>
	);
}