import React from 'react';
import VAL from '../state/const';

export default () => (
	<main className="about">
		<h1>RacerRank</h1>
		<h2>About</h2>

		<p>RacerRank is a point system for Star Wars: Episode I Racer time trials. Players are ranked by total points based on performance in their personal records on each track.</p>

		<h4>Point Calculation</h4>
		<p>Points are given individually for full race (3-Lap) and individual lap (1-Lap) records. Within each category, times are scored against the best known time, with up to {VAL.Score.Max} points being given to times {VAL.Score.Scale}&times; this time or faster. Points are assigned linearly within this range and are calculated to {VAL.Score.Precision} decimal places.</p>

		<h4>Submitting Times</h4>
		<p>Times are gathered using the Speedrun.com API. To join the rankings, submit your times to the Star Wars Racer <a href="https://www.speedrun.com/swe1r/individual_levels" alt="SWE1R Level Leaderboard" target="_blank" rel="noopener noreferrer">Level Leaderboard</a> on Speedrun.com, and they will automatically appear on RacerRank once verified.</p>

		<p>To get involved with the community and discuss time trial strategy, join the Star Wars Racer <a href="https://discord.gg/ctmKzzF" alt="Star Wars Racer on Discord" target="_blank" rel="noopener noreferrer">Discord Server</a>. Beginners are more than welcome!</p>

		<h4>Source Code</h4>
		<p>RacerRank source code can be found on <a href="https://github.com/everalert/swe1r-rank" alt="RacerRank source code repository" target="_blank" rel="noopener noreferrer">Github</a>.</p>
	</main>
);