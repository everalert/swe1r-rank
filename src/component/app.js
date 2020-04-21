import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './loader';
import About from '../static/about';
import Ranking from './ranking'
import PlayerList from './playerlist'
import Player from './player'
import TrackList from './tracklist'
import Track from './track'
import Header from './header'
import Footer from './footer'

export default () => {
	const loading = useSelector(state => state.loading);
	const dark = useSelector(state => state.settings.dark);
	const section = useSelector(state => state.section);
	const PAGE = ((section)=>{
		switch (section) {
			case 'PLAYERLIST': return <PlayerList/>;
			case 'PLAYER':  return <Player/>
			case 'TRACKLIST': return <TrackList/>;
			case 'TRACK': return <Track/>;
			case 'ABOUT': return <About/> 
			case 'RANKING': default: return <Ranking/>;
		}
	})(section)
	return (
		<div id="container" className={dark?'dark-theme':''}>
			<Header/>
			{ loading ? <main><Loader/></main> : PAGE }
			<Footer/>
		</div>
	);
}