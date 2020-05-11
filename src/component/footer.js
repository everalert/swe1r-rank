import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useDispatch } from 'react-redux';
import { MdLightbulbOutline } from 'react-icons/md';
import Actions from '../state/action';

export default () => {
	const dispatch = useDispatch();
	const toggleTheme = ()=>dispatch(Actions.toggleTheme());
	return (
			<footer>
				<nav>
					<Link to={VAL.Routes.ABOUT}><button>About</button></Link>
					<Link to={VAL.Routes.CHANGELOG}><button>Changelog</button></Link>
					<button onClick={toggleTheme} className='icon'><MdLightbulbOutline/></button>
				</nav>
			</footer>
	);
}