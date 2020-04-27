import VAR from '../state/const'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Numeral from 'numeral';
import Actions from '../state/action';

export default (props) => {
	const sort = useSelector(state => state.trackTab);
	const dispatch = useDispatch();
	const gotoPlayer = (id) => dispatch(Actions.gotoPlayer(id));
	const showDetail = (id,title) => dispatch(Actions.setCtxPanToPlayer(id,title));
	const closeDetail = (id) => dispatch(Actions.setCtxPanToTrack(id));
	return (
		<section className='table track-ranking' onMouseLeave={()=>closeDetail(props.track)}>
			<div className='header'>
				<div className='player'>PLAYER</div>
				<div className='points'>PTS</div>
				<div className='time'>TIME</div>
			</div>
			{ props.data.map((item,i) => {
				if (item[`sort${sort}`]<3599.99)
					return <div onClick={()=>gotoPlayer(item.id)} onMouseEnter={()=>showDetail(item.id,item.name)} className={`item rank${item.rank}`} key={i}>
						<div className='rank'>{Numeral(item.rank).format('0o')}</div>
						<div className='player'>{item.name}</div>
						{ Object.entries(item.fields).map((f,i) =>
							<div key={i} className={VAR.TableFields[f[0]]}>{f[1]}</div>) }
					</div>
				else return '';
			}) }
		</section>
	);
}