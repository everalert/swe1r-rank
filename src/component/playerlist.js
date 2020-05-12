import React from 'react';
import { connect } from 'react-redux';
import PlayerList from '../element/table-playerlist';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';


const mapStateToProps = state => {
	return { data: state.table	};
}

const mapDispatchToProps = dispatch => {
	return {
		setCtxPanToPlayerList: () => dispatch(Actions.setCtxPanToPlayerList()),
		gotoPlayerList: () => dispatch(Actions.gotoPlayerList())
	};
}


class Players extends React.Component {
	constructor(props) {
		super(props);
		this.props.gotoPlayerList();
		this.props.setCtxPanToPlayerList();
	}

	render() {
		return (
			<main>
				<h1>All</h1>
				<h2>Racers</h2>
				<ContextPanel/>
				<PlayerList data={this.props.data}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Players);