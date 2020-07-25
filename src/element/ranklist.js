import VAL from '../state/const';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CalcElementScreenPosY } from '../module/viewport';
import Tilt from 'react-tilt';
import Actions from '../state/action';

export default (props) => {
	const ranklist = useSelector(state => state.ranklist);

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
		<section className={`table ${props.wide?'table-wide':''} ${ranklist.className}`} onMouseLeave={props.panel?()=>closeDetail():undefined}>
			<div className='header'>
				{ ranklist.header.map((item,i) => <div className={item.className} key={i}>{item.label}</div>)}
			</div>
			{ ranklist.items.map((item,i) => {
				return <Tilt className='Tilt' options={VAL.Setting.Tilt.TableItem} key={i}>
					<Link to={item.link} className={`Tilt-inner item ${item.className}`} onMouseEnter={props.panel&&item.panel?()=>showDetail(item.panel.s,item.panel.p,item.panel.t):undefined}>
						{ item.fields.map((f,i) => <div className={f.className} key={i}>{f.label}</div>) }
					</Link>
				</Tilt>;
			}) }
		</section>
	);
}