import React from 'react';
import VAL from '../state/const';
import Tilt from 'react-tilt';
import '../css/tilt.css';
import '../css/highlight-item.css';

export default (props) => {
	let entry;
	switch (props.data.type) {
		case 'ITEM':
			entry = (<div className='highlight-item'>
							<Tilt className='Tilt value' options={VAL.Setting.Tilt.CtxPan}>
								<div className='Tilt-inner'>{props.data.value}</div>
							</Tilt>
						<div className='name'>{props.data.name}</div>
					</div>);
			break;
		default:
			entry = null;
	}
	return entry;
}