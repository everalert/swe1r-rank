import VAR from '../state/const'
import React from 'react';
import { useDispatch } from 'react-redux';
import Actions from '../state/action';

export default (props) => {
	const dispatch = useDispatch();
	const gotoPlayer = (id) => dispatch(Actions.gotoPlayer(id));
	const showDetail = (id,title) => dispatch(Actions.setCtxPanToPlayer(id,title));
	const closeDetail = () => dispatch(Actions.setCtxPanToPlayerList());
	return (
		<section className='table player-list' onMouseLeave={()=>closeDetail()}>
			<div className='header'>
				<div className='player'>PLAYER</div>
				<div className='points'>PTS</div>
				<div className='time'>TIME</div>
			</div>
			{ props.data.map((item,i) => {
				return (<div onClick={()=>gotoPlayer(item.id)} onMouseEnter={()=>showDetail(item.id,item.name)} className='item' key={i}>
					<div className='player'>{item.name}</div>
					{ Object.entries(item.fields).map((f,i) =>
						<div key={i} className={VAR.TableFields[f[0]]}>{f[1]}</div>) }
				</div>)
			}) }
		</section>
	);
}