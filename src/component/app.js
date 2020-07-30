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
import RankListPage from './ranklistpage';
import Header from './header';
import Footer from './footer';
import TrophyPanel from '../element/trophy-panel';

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
						<Route path={VAL.Routes.PLAYERLIST} component={(props) => {
							return <RankListPage
								{...props}
								className='player-list'
								section='PLAYERLIST'
								title='Racers'
								reverseTitles={true}
								laps='HIDE' />
						}}/>
						<Route path={VAL.Routes.PLAYER} component={(props) => {
							const players = useSelector(state => state.players);
							return <RankListPage
									{...props}
									className='player'
									section='PLAYER'
									pageData={players}
									reverseTitles={true}
									laps='HIDE'>
								<TrophyPanel totals={!players[props.match.params.id] || players[props.match.params.id].totals}/>
							</RankListPage>
						}}/>
						<Route path={VAL.Routes.TRACKLIST} component={(props) => {
							return <RankListPage
								{...props}
								className='track-list'
								section='TRACKLIST'
								title='Tracks'
								reverseTitles={true}
								laps='HIDE' />
						}}/>
						<Route path={VAL.Routes.TRACK} component={(props) => {
							const tracks = useSelector(state => state.levels);
							return <RankListPage
								{...props}
								className='track'
								section='TRACK'
								pageData={tracks}
								reverseTitles={true}
								laps='NO_ALL' />
						}}/>
						<Route path={VAL.Routes.DEBUG} component={Debug}/>
						<Route path={VAL.Routes.ABOUT} component={About}/>
						<Route path={VAL.Routes.CHANGELOG} component={Changelog}/>
						<Route path={VAL.Routes.RANKING} component={(props) => {
							return <RankListPage
								{...props}
								className='ranking'
								section='RANKING'
								title='Ranking'
								laps='HIDE' />
						}}/>
						<Route path='/' component={(props) => {
							return <RankListPage
								{...props}
								className='ranking'
								section='RANKING'
								title='Ranking'
								laps='HIDE' />
						}}/>
					</Switch> }
				<Footer/>
			</div>
		</Router>
	);
}