import React from 'react';

export default (props) => {
	return (
		<div className='panel-item'>
			<div className='name'>{props.name}</div>
			<div className='value'>{props.value}</div>
		</div>
	);
}