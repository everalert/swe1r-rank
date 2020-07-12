import VAL from '../state/const';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import Actions from '../state/action';
import { CalcElementScreenPosY } from '../module/viewport';
import Tilt from 'react-tilt';
import Numeral from 'numeral';

export default (props) => {
	// const dispatch = useDispatch();
	// const showDetail = (section,page,title) => {
	// 	dispatch(Actions.changeCtxPan(section,page));
	// 	dispatch(Actions.updateCtxPan(title));
	// };
	// const closeDetail = () => {
	// 	dispatch(Actions.changeCtxPan());
	// 	dispatch(Actions.updateCtxPan());
	// };

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
		<section className='table table-wide player-times' /*onMouseLeave={()=>closeDetail(props.player)}*/>
			<div className='header'>
				<div className='track'>TRACK</div>
				<div className='best-3lap'>3-LAP</div>
				<div className='best-1lap'>1-LAP</div>
			</div>
			{ props.data.map((item,i) => {
				return <Tilt className='Tilt' options={VAL.Setting.Tilt.TableItem}>
					<Link to={VAL.Routes.TRACK.replace(':id',item.id)} className='Tilt-inner item' /*onMouseEnter={()=>showDetail('TRACK',item.id,item.name)}*/ key={i}>
						<div className='track'>{item.name}</div>
						<div className={`time-3lap rank-${item.fields.rank3L}`}>{item.fields.time3L || VAL.Setting.Fallback.Time}</div>
						<div className={`points-3lap rank-${item.fields.rank3L}`}>{item.fields.pts3L || VAL.Setting.Fallback.Points}</div>
						<div className={`rank-3lap rank-${item.fields.rank3L}`}>{(item.fields.rank3L && Numeral(item.fields.rank3L).format('0o')) || VAL.Setting.Fallback.Rank}</div>
						<div className={`time-1lap rank-${item.fields.rank1L}`}>{item.fields.time1L || VAL.Setting.Fallback.Time}</div>
						<div className={`points-1lap rank-${item.fields.rank1L}`}>{item.fields.pts1L || VAL.Setting.Fallback.Points}</div>
						<div className={`rank-1lap rank-${item.fields.rank1L}`}>{(item.fields.rank1L && Numeral(item.fields.rank1L).format('0o')) || VAL.Setting.Fallback.Rank}</div>
					</Link>
				</Tilt>;
			}) }
		</section>
	);
}