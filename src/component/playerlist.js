import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
import HighlightPanel from '../element/hlpan';
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
			dispatch(Actions.changeSection('PLAYERLIST'));
			dispatch(Actions.updateRankList());
			dispatch(Actions.updateCtxPan());
		}
	};
}


class Players extends React.Component {
	constructor(props) {
		super(props);
		this.props.initialize();
	}

	render() {
		return (
			<main className="player-list">
				<h1>{FormatCategoryTitle(this.props.overall, this.props.skips, this.props.upgrades, 0)}</h1>
				<h2>Racers</h2>
				<HighlightPanel/>
				<RankList wide={true}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Players);