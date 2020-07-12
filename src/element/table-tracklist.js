import VAL from '../state/const';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Tilt from 'react-tilt';
import Actions from '../state/action';
import { CalcElementScreenPosY } from '../module/viewport';

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
	useEffect(() => {
		// calc bg positions on pageload
		const windowH = window.innerHeight;
		Array.from(document.getElementsByClassName('table')[0].getElementsByClassName('item')).forEach(i => {
			i.style.backgroundPosition = `center ${CalcElementScreenPosY(i, windowH)}%`;
		})
		// re-calc on scroll
		return document.addEventListener("scroll", e => {
			const windowH = window.innerHeight;
			Array.from(document.getElementsByClassName('table')[0].getElementsByClassName('item')).forEach(i => {
				i.style.backgroundPosition = `center ${CalcElementScreenPosY(i, windowH)}%`;
			})
		});
	});
	return (
		<section className='table track-list' onMouseLeave={()=>closeDetail()}>
			<div className='header'>
				<div className='track'>TRACK</div>
				<div className='best-3lap'>3-LAP</div>
				<div className='best-1lap'>1-LAP</div>
			</div>
			{ props.data.map((item,i) => {
				return (<Tilt className='Tilt' options={VAL.Setting.Tilt.TableItem}>
					<Link to={VAL.Routes.TRACK.replace(':id',item.id)} onMouseEnter={()=>showDetail('TRACK',item.id,item.name)} className='Tilt-inner item' key={i}>
						<div className='track'>{item.name}</div>
						{ Object.entries(item.fields).map((f,i) =>
							<div key={i} className={VAL.TableFields[f[0]]}>{f[1]}</div>) }
					</Link>
				</Tilt>)
			}) }
		</section>
	);
}