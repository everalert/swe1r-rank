import React from 'react';
import VAL from '../state/const';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../state/action';

export default () => {
	const devShow = useSelector(state => state.settings.developerShow);
	const dispatch = useDispatch();
	const toggleDevShow = () => dispatch(Actions.toggleDeveloperShow());
	return <main className="developer">
		<h1>RacerRank</h1>
		<h2>DEVELOPER PANEL</h2>
		<div>Show Developer Information <button onClick={toggleDevShow}>{devShow ? 'ON' : 'OFF'}</button></div>
	</main>
};