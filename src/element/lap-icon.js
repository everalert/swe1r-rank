import React from 'react';
import { useSelector } from 'react-redux';
import VAL from '../state/const';
// import { ReactComponent as IconALL } from '../img/icon-lap-overall.svg';
// import { ReactComponent as Icon3L } from '../img/icon-lap-3lap.svg';
// import { ReactComponent as Icon1L } from '../img/icon-lap-1lap.svg';

export default () => {
	const lap = useSelector(state => state.settings.lap);
	switch (lap) {
		case 2: return <span>1L</span>;
		case 1: return <span>3L</span>;
		default: return <span>Ov</span>;
	}
}