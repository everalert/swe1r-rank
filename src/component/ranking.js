import VAL from '../state/const';
import React from 'react';
import { connect } from 'react-redux';
import Ranking from '../element/table-ranking';
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
				<h2>{FormatCategoryTitleFromSettings(this.props.settings)}</h2>
				<ContextPanel/>
				<Ranking data={this.props.data}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(RankingPage);