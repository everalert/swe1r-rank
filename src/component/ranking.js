import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageSelector from '../element/page-selector';
import Ranking from '../element/table-ranking';
import Actions from '../state/action';

export default () => {
	const dispatch = useDispatch();
	const sort = (sorting) => dispatch(Actions.sortRanking(sorting.value));
	const menu = useSelector(state => state.menu);
	const sorting = useSelector(state => state.rankingTab);
	const data = useSelector(state => state.table);
	const pageName = menu.filter(item => item.value===sorting)[0].label;
	return (
		<main>
			<h1>Ranking</h1>
			<h2>{pageName}</h2>
			<PageSelector onChangeHandler={sort} menu={menu} initial={sorting} />
			<div className='side-bar'><div className='side-panel'>CONTEXT PANEL</div></div>
			<Ranking data={data}/>
		</main>
	);
}