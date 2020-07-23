import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';
import { FormatCategoryTitle } from '../module/format';


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
			dispatch(Actions.changeSection('TRACKLIST'));
			dispatch(Actions.updateRankList());
			dispatch(Actions.updateCtxPan());
		}
	};
}


class Tracks extends React.Component {
	constructor(props) {
		super(props);
		this.props.initialize();
	}

	render() {
		return (
			<main>
				<h1>{FormatCategoryTitle(this.props.overall, this.props.skips, this.props.upgrades, 0)}</h1>
				<h2>Tracks</h2>
				<ContextPanel/>
				<RankList panel={true}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Tracks);