import VAL from '../state/const'
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Numeral from 'numeral';
import Tilt from 'react-tilt';
import Actions from '../state/action';

export default (props) => {
	const sort = useSelector(state => state.page);
	const dispatch = useDispatch();
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
				return <Tilt className='Tilt' options={VAL.Setting.Tilt.TableItem}>
					<Link to={VAL.Routes.PLAYER.replace(':id',item.id)} onMouseEnter={()=>showDetail(item.id,item.name)} className={`Tilt-item item rank${item.rank}`} key={i}>
						<div className='rank'>{Numeral(item.rank).format('0o')}</div>
						<div className='player'>{item.name}</div>
						{ Object.entries(item.fields).map((f,i) =>
							<div key={i} className={VAL.TableFields[f[0]]}>{f[1]}</div>) }
					</Link>
				</Tilt>
			}) }
		</section>
	);
}