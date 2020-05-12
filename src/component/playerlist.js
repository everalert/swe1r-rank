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
		initialize: () => {
			dispatch(Actions.changeSection('PLAYERLIST'));
			dispatch(Actions.updateTable());
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