import React from 'react';
import SkipsIcon from '../element/icon-skips';
import UpgradesIcon from '../element/icon-upgrades';
import VAL from '../state/const';
import Numeral from 'numeral';
import Tilt from 'react-tilt';
import '../css/tilt.css';
import '../css/trophy.css';
import { useDispatch } from 'react-redux';
import Actions from '../state/action';

export default (props) => {
	const dispatch = useDispatch();
	const setCategory = (overall=false, skips=true, upgrades=true) => {
		dispatch(Actions.setOverallSetting(overall));
		dispatch(Actions.setSkipsSetting(skips));
		dispatch(Actions.setUpgradesSetting(upgrades));
		dispatch(Actions.updateRankList());
		dispatch(Actions.updateCtxPan());
	};

	const catStr = props.overall ?
		<div className="trophy-cat">OVERALL</div> :
		<div className="trophy-cat"><SkipsIcon className={props.skips?'cat-on':'cat-off'}/><UpgradesIcon className={props.upgrades?'cat-on':'cat-off'}/></div>;
	return (
		<Tilt options={VAL.Setting.Tilt.Trophy} className='Tilt trophy-container'>
			<div className='Tilt-inner'>
				<div className={`trophy rank-${props.rank}`} onClick={e => setCategory(props.overall,props.skips,props.upgrades)}>
					<div className="trophy-rank">{props.rank ? props.rank : '—'}</div>
					<div className="trophy-points">{Numeral(props.points).format(VAL.Setting.Format.TrophyPoints)}</div>
					{catStr}
				</div>
			</div>
		</Tilt>
	);
}