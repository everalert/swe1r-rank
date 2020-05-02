import React from 'react';
import Heading from './ctxpan-heading';
import Text from './ctxpan-text';
import Item from './ctxpan-item';

export default (props) => {
	let entry;
	switch (props.data.type) {
		case 'HEADING':
			entry = <Heading value={props.data.value}/>;
			break;
		case 'TEXT':
			entry = <Text value={props.data.value}/>;
			break;
		case 'ITEM':
			entry = <Item name={props.data.name} value={props.data.value}/>;
			break;
		default:
	}
	return entry;
}