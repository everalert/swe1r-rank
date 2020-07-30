import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CalcElementScreenPosY } from '../module/viewport';
import Actions from '../state/action';
import '../css/tilt.css';
import '../css/ranklist.css';

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

	const positionItemBGs = (e) => {
		const windowH = window.innerHeight;
		Array.from(document.getElementsByClassName('table')[0].getElementsByClassName('item')).forEach(i => {
			i.style.backgroundPosition = `center ${CalcElementScreenPosY(i, windowH)}%`;
		})
	}

	useEffect(() => {
		// calc bgs on mount
		positionItemBGs();

		// re-calc on scroll
		document.addEventListener("scroll", positionItemBGs);

		// remove listener on unmount
		return () => document.removeEventListener("scroll", positionItemBGs)
	});

	return (
		<section className={`table ${props.wide?'table-wide':''} ${ranklist.className}`} onMouseLeave={props.panel?()=>closeDetail():undefined}>
			<div className='header'>
				{ ranklist.header.map((item,i) => <div className={item.className} key={i}>{item.label}</div>)}
			</div>
			{ ranklist.items.map((item,i) => {
				return <div className='item-container' key={i}>
					<Link to={item.link} className={`item ${item.className}`} onMouseEnter={props.panel&&item.panel?()=>showDetail(item.panel.s,item.panel.p,item.panel.t):undefined}>
						{ item.fields.map((f,i) => <div className={f.className} key={i}>{f.label}</div>) }
					</Link>
				</div>;
			}) }
		</section>
	);
}