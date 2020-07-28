import React from 'react';
import { Link } from 'react-router-dom';
import VAL from '../state/const';
import { useSelector } from 'react-redux';
import '../css/footer.css';
import '../css/icon.css';

export default () => {
	const debug = useSelector(state => state.settings.debugMode);
	return (
			<footer>
				<nav>
					<Link to={VAL.Routes.ABOUT}>About</Link>
					<Link to={VAL.Routes.CHANGELOG}>Changelog</Link>
					{ debug && <Link to={VAL.Routes.DEBUG}>Debug</Link> }
				</nav>
			</footer>
	);
}