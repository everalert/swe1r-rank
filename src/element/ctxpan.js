import React from 'react';
import { useSelector } from 'react-redux';
import Item from './ctxpan-item';

export default () => {
	const title = useSelector(state => state.panel.title);
	const items = useSelector(state => state.panel.items);
	return (
		<section className='side-bar'>
			<div className={`side-panel ${items.length?'':'hide'}`}>
				{ title ? <h3>{title}</h3> : '' }
				{ items.map((i,k) => <Item name={i.name} value={i.value} key={k}/>) }
			</div>
		</section>
	);
}