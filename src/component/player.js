import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Player from '../element/table-player';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';


const mapStateToProps = state => {
	return {
		data: state.table,
		players: state.players
	};
}

const mapDispatchToProps = dispatch => {
	return {
		setCtxPanToPlayer: (id) => dispatch(Actions.setCtxPanToPlayer(id)),
		gotoPlayer: (id) => dispatch(Actions.gotoPlayer(id)),
		sort: (sorting) => dispatch(Actions.sortRanking(sorting.value))
	};
}


class PlayerPage extends React.Component {
	constructor(props) {
		super(props);
		this.playerId = this.props.match.params.id;
		this.props.gotoPlayer(this.playerId);
		this.props.setCtxPanToPlayer(this.playerId);
	}

	render() {
		return (
			<main>
				<h1>Player</h1>
				<h2>{this.props.players[this.playerId].name}</h2>
				<ContextPanel/>
				<Player player={this.playerId} data={this.props.data}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PlayerPage);