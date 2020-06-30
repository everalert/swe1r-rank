import React from 'react';
import { connect } from 'react-redux';
import Player from '../element/table-player';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';
import { FormatCategoryTitleFromSettings } from '../module/format';
import TrophyPanel from '../element/trophy-panel';


const mapStateToProps = state => {
	return {
		data: state.table,
		players: state.players,
		settings: state.settings
	};
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: (playerId) => {
			dispatch(Actions.changeSection('PLAYER',playerId));
			dispatch(Actions.updateTable());
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
			<h1>{FormatCategoryTitleFromSettings(this.props.settings)}</h1>
			<h2>{this.props.players[this.playerId].name}</h2>
			<ContextPanel/>
			<Player player={this.playerId} data={this.props.data}/>
			<TrophyPanel c={this.props.players[this.playerId].combinedTotals} o={this.props.players[this.playerId].overallTotals}/>
		</main>
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PlayerPage);