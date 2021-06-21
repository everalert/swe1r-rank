import React from 'react';
import { useSelector } from 'react-redux';
import VAL from '../state/const';
import Entry from './ctxpan-entry';
import Tilt from 'react-tilt';
import '../css/tilt.css';
import '../css/ctxpan.css';

export default () => {
	const title = useSelector(state => state.panel.title);
	const items = useSelector(state => state.panel.items);
	return (
		<section className='side-bar'>
			<Tilt className='Tilt' options={VAL.Setting.Tilt.CtxPan}>
				<div className={`Tilt-inner side-panel ${items.length?'':'hide'}`}>
					{ title ? <h3>{title}</h3> : '' }
					{ items.map((i,k) => <Entry data={i} key={k}/>) }
				</div>
			</Tilt>
		</section>
	);
}