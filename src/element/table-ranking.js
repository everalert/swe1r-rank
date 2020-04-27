import VAR from '../state/const'
import React from 'react';
import Numeral from 'numeral';
import { useDispatch } from 'react-redux';
import Actions from '../state/action';

export default (props) => {
	const dispatch = useDispatch();
	const gotoPlayer = (id) => dispatch(Actions.gotoPlayer(id));
	const showDetail = (id,title) => dispatch(Actions.setCtxPanToPlayer(id,title));
	const closeDetail = () => dispatch(Actions.setCtxPanToRanking());
	return (
		<section className='table ranking-data' onMouseLeave={()=>closeDetail()}>
			<div className='header'>
				<div className='player'>PLAYER</div>
				<div className='points-total'>PTS</div>
				<div className='time-total'>TIME</div>
			</div>
			{ props.data.map((item,i) => {
				return (<div onClick={()=>gotoPlayer(item.id)} onMouseEnter={()=>showDetail(item.id,item.name)} className={`item rank${item.rank}`} key={i}>
					<div className='rank'>{Numeral(item.rank).format('0o')}</div>
					<div className='player'>{item.name}</div>
					{ Object.entries(item.fields).map((f,i) =>
						<div key={i} className={VAR.TableFields[f[0]]}>{f[1]}</div>) }
				</div>)
			}) }
		</section>
	);
}