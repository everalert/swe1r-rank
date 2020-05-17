import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import VAL from '../state/const';
import { useSelector } from 'react-redux';
import Loader from './loader';
import Debug from './debug';
import About from './about';
import Changelog from './changelog';
import Ranking from './ranking';
import PlayerList from './playerlist';
import Player from './player';
import TrackList from './tracklist';
import Track from './track';
import Header from './header';
import Footer from './footer';

export default () => {
	const loading = useSelector(state => state.loading);
	const dark = useSelector(state => state.settings.dark);
	return (
		<Router>
			<div id="container" className={dark?'dark-theme':''}>
				<Header/>
				{ loading ? 
					<main><Loader/></main> : 
					<Switch>
						<Route path={VAL.Routes.PLAYERLIST} component={PlayerList}/>
						<Route path={VAL.Routes.PLAYER} component={Player}/>
						<Route path={VAL.Routes.TRACKLIST} component={TrackList}/>
						<Route path={VAL.Routes.TRACK} component={Track}/>
						<Route path={VAL.Routes.DEBUG} component={Debug}/>
						<Route path={VAL.Routes.ABOUT} component={About}/>
						<Route path={VAL.Routes.CHANGELOG} component={Changelog}/>
						<Route path={VAL.Routes.HOME} component={Ranking}/>
						<Route path='/' component={Ranking}/>
					</Switch> }
				<Footer/>
			</div>
		</Router>
	);
}