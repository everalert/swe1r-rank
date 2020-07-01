import React from 'react';
import { useSelector } from 'react-redux';
import Entry from './hlpan-entry';

export default () => {
	const items = useSelector(state => state.panel.items);
	return (
		<section className='highlight-panel'>
			<div className={`${items.length?'':'hide'}`}>
				{ items.map((i,k) => <Entry data={i} key={k}/>) }
			</div>
		</section>
	);
}