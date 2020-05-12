import VAL from '../state/const';
import React from 'react';
import { connect } from 'react-redux';
import PageSelector from '../element/page-selector';
import Ranking from '../element/table-ranking';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';


const mapStateToProps = state => {
	return {
		data: state.table,
		lap: state.settings.lap,
		sorting: state.rankingTab,
		menu: state.menu
	};
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: () => {
			dispatch(Actions.changeSection('RANKING'));
			dispatch(Actions.updateTable());
			dispatch(Actions.updateCtxPan());
		},
		sort: (sorting) => dispatch(Actions.sortRanking(sorting.value))
	};
}


class RankingPage extends React.Component {
	constructor(props) {
		super(props);
		this.props.initialize();
	}

	render() {
		return (
			<main>
				<h1>Ranking</h1>
				<h2>{VAL.Setting.Lap[this.props.lap].name}</h2>
				{/*<PageSelector onChangeHandler={this.props.sort} menu={this.props.menu} initial={this.props.sorting} />*/}
				<ContextPanel/>
				<Ranking data={this.props.data}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(RankingPage);