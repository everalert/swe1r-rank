import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
import ContextPanel from '../element/ctxpan';
import { FormatCategoryTitleFromSettings } from '../module/format';
import Actions from '../state/action';


const mapStateToProps = state => {
	return {
		data: state.table,
		settings: state.settings
	};
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: () => {
			dispatch(Actions.changeSection('RANKING'));
			dispatch(Actions.updateRankList());
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
				<h2>{FormatCategoryTitleFromSettings(this.props.settings)}</h2>
				<ContextPanel/>
				<RankList panel={true}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(RankingPage);