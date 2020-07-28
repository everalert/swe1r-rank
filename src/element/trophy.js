import React from 'react';
import SkipsIcon from '../element/icon-skips';
import UpgradesIcon from '../element/icon-upgrades';
import VAL from '../state/const';
import Numeral from 'numeral';
import Tilt from 'react-tilt';
import '../css/tilt.css';
import '../css/trophy.css';

export default (props) => {
	const catStr = props.overall ?
		<div className="trophy-cat">OVERALL</div> :
		<div className="trophy-cat"><SkipsIcon className={props.skips?'cat-on':'cat-off'}/><UpgradesIcon className={props.upgrades?'cat-on':'cat-off'}/></div>;
	return (
		<Tilt options={VAL.Setting.Tilt.Trophy} className='Tilt trophy-container'>
			<div className='Tilt-inner'>
				<div className={`trophy rank-${props.rank}`}>
					<div className="trophy-rank">{props.rank ? props.rank : '—'}</div>
					<div className="trophy-points">{Numeral(props.points).format(VAL.Setting.Format.TrophyPoints)}</div>
					{catStr}
				</div>
			</div>
		</Tilt>
	);
}