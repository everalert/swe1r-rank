import VAR from '../state/const'
import React from 'react';
import { useDispatch } from 'react-redux';
import Actions from '../state/action';

export default (props) => {
	const dispatch = useDispatch();
	const gotoTrack = (id) => dispatch(Actions.gotoTrack(id));
	return (
		<section className='table player-times'>
			<div className='header'>
				<div className='track'>TRACK</div>
				<div className='best-3lap'>3-LAP</div>
				<div className='best-1lap'>1-LAP</div>
			</div>
			{ props.data.map((item,i) => {
				return <div onClick={()=>gotoTrack(item.id)} className='item' key={i}>
					<div className='track'>{item.name}</div>
					<div className='time-3lap'>{item.fields.time3L || VAR.Setting.Fallback.Time}</div>
					<div className='points-3lap'>{item.fields.pts3L || VAR.Setting.Fallback.Points}</div>
					<div className='time-1lap'>{item.fields.time1L || VAR.Setting.Fallback.Time}</div>
					<div className='points-1lap'>{item.fields.pts1L || VAR.Setting.Fallback.Points}</div>
				</div>;
			}) }
		</section>
	);
}