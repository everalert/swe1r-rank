import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
import HighlightPanel from '../element/hlpan';
import { FormatCategoryTitle } from '../module/format';
import Actions from '../state/action';


const mapStateToProps = state => {
	return {
		data: state.table,
		overall: state.settings.overall,
		skips: state.settings.skips,
		upgrades: state.settings.upgrades
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
			<main className="ranking">
				<h1>Ranking</h1>
				<h2>{FormatCategoryTitle(this.props.overall, this.props.skips, this.props.upgrades, 0)}</h2>
				<HighlightPanel/>
				<RankList wide={true}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(RankingPage);