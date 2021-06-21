import React from 'react';
import VAL from '../state/const';
import { useSelector } from 'react-redux';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { GetLapSettingObj } from '../module/format';
import '../css/category-string.css';

export default (props) => {
	const overall = useSelector(state => state.settings.overall);
	const skips = useSelector(state => state.settings.skips);
	const upgrades = useSelector(state => state.settings.upgrades);
	const lap = useSelector(state => state.settings.lap);
	const strings = [];

	if (overall)
		strings.push(<span className="cat-label" key={strings.length}>Overall</span>);
	else {
		strings.push(skips?<span className="cat-label" key={strings.length}>Skips<IoIosCheckmarkCircleOutline className="cat-icon-yes"/></span>:<span className="cat-label" key={strings.length}>No Skips<IoIosCloseCircleOutline className="cat-icon-no"/></span>);
		strings.push(upgrades?<span className="cat-label" key={strings.length}>Upgrades<IoIosCheckmarkCircleOutline className="cat-icon-yes"/></span>:<span className="cat-label" key={strings.length}>No Upgrades<IoIosCloseCircleOutline className="cat-icon-no"/></span>);
	}
	if (props.laps !== 'HIDE') {
		if (props.laps === 'NO_ALL') {
			const lap_obj = VAL.Setting.Lap[lap].key==='ALL' ? GetLapSettingObj('3L') : GetLapSettingObj(VAL.Setting.Lap[lap].key);
			strings.push(<span className="cat-label" key={strings.length}>{lap_obj.name}</span>);
		} else if (VAL.Setting.Lap[lap].key!=='ALL') {
			strings.push(<span className="cat-label" key={strings.length}>{VAL.Setting.Lap[lap].name}</span>);
		}
	}

	return (
		<span className="cat-string">
			{strings.reduce((acc,next,i) => [acc,<span className="cat-sep" key={strings.length+i}>‧</span>,next])}
		</span>
	);
}