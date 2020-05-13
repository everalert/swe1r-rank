import VAL from '../state/const'
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Tilt from 'react-tilt';
import Actions from '../state/action';

export default (props) => {
	const dispatch = useDispatch();
	const showDetail = (section,page,title) => {
		dispatch(Actions.changeCtxPan(section,page));
		dispatch(Actions.updateCtxPan(title));
	};
	const closeDetail = () => {
		dispatch(Actions.changeCtxPan());
		dispatch(Actions.updateCtxPan());
	};
	return (
		<section className='table player-list' onMouseLeave={()=>closeDetail()}>
			<div className='header'>
				<div className='player'>PLAYER</div>
				<div className='points'>PTS</div>
				<div className='time'>TIME</div>
			</div>
			{ props.data.map((item,i) => {
				return (<Tilt className='Tilt' options={VAL.Setting.Tilt.TableItem}>
					<Link to={VAL.Routes.PLAYER.replace(':id',item.id)} onMouseEnter={()=>showDetail('PLAYER',item.id,item.name)} className='Tilt-inner item' key={i}>
						<div className='player'>{item.name}</div>
						{ Object.entries(item.fields).map((f,i) =>
							<div key={i} className={VAL.TableFields[f[0]]}>{f[1]}</div>) }
					</Link>
				</Tilt>)
			}) }
		</section>
	);
}