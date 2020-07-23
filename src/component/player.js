import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
import HighlightPanel from '../element/hlpan';
import Actions from '../state/action';
import { FormatCategoryTitle } from '../module/format';
import TrophyPanel from '../element/trophy-panel';


const mapStateToProps = state => {
	return {
		data: state.table,
		players: state.players,
		overall: state.settings.overall,
		skips: state.settings.skips,
		upgrades: state.settings.upgrades
	};
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: (playerId) => {
			dispatch(Actions.changeSection('PLAYER',playerId));
			dispatch(Actions.updateRankList());
			dispatch(Actions.updateCtxPan());
		}
	};
}


class PlayerPage extends React.Component {
	constructor(props) {
		super(props);
		this.playerId = this.props.match.params.id;
		this.props.initialize(this.playerId);
	}

	render() {
		if (!this.props.players[this.playerId])
			return <main className='error-message'><p>Racer {this.playerId} not found.</p></main>
		return <main className='player'>
			<h1>{FormatCategoryTitle(this.props.overall, this.props.skips, this.props.upgrades, 0)}</h1>
			<h2>{this.props.players[this.playerId].name}</h2>
			<HighlightPanel/>
			<RankList wide={true}/>
			<TrophyPanel c={this.props.players[this.playerId].combinedTotals} o={this.props.players[this.playerId].overallTotals}/>
		</main>
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PlayerPage);