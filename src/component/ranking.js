import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageSelector from '../element/page-selector';
import Ranking from '../element/table-ranking';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';

export default () => {
	const dispatch = useDispatch();
	const sort = (sorting) => dispatch(Actions.sortRanking(sorting.value));
	const menu = useSelector(state => state.menu);
	const sorting = useSelector(state => state.rankingTab);
	const data = useSelector(state => state.table);
	const pageName = menu.filter(item => item.value===sorting)[0].label;

	dispatch(Actions.setCtxPanToRanking());

	return (
		<main>
			<h1>Ranking</h1>
			<h2>{pageName}</h2>
			<PageSelector onChangeHandler={sort} menu={menu} initial={sorting} />
			<ContextPanel/>
			<Ranking data={data}/>
		</main>
	);
}