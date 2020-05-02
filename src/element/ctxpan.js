import React from 'react';
import { useSelector } from 'react-redux';
import Entry from './ctxpan-entry';

export default () => {
	const title = useSelector(state => state.panel.title);
	const items = useSelector(state => state.panel.items);
	return (
		<section className='side-bar'>
			<div className={`side-panel ${items.length?'':'hide'}`}>
				{ title ? <h3>{title}</h3> : '' }
				{ items.map((i,k) => <Entry data={i} key={k}/>) }
			</div>
		</section>
	);
}