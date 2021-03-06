import React from 'react';
//import VAL from '../state/const';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../state/action';

export default () => {
	const darkTheme = useSelector(state => state.settings.dark);
	const debugInfo = useSelector(state => state.settings.debugInfo);
	const dispatch = useDispatch();
	const toggleDebugInfo = () => dispatch(Actions.toggleDebugInfo());
	const toggleTheme = () => dispatch(Actions.toggleTheme());
	return <main className="developer">
		<h1>RacerRank</h1>
		<h2>DEBUG PANEL</h2>
		<div>Show Debugging Information <button onClick={toggleDebugInfo}>{debugInfo ? 'ON' : 'OFF'}</button></div>
		<div>Dark Theme <button onClick={toggleTheme}>{darkTheme ? 'ON' : 'OFF'}</button></div>
	</main>
};