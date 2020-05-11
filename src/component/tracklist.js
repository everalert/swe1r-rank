import React from 'react';
import { connect } from 'react-redux';
import TrackList from '../element/table-tracklist';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';


const mapStateToProps = state => {
	return { data: state.table	};
}

const mapDispatchToProps = dispatch => {
	return {
		setCtxPanToTrackList: () => dispatch(Actions.setCtxPanToTrackList()),
		gotoTrackList: () => dispatch(Actions.gotoTrackList())
	};
}


class Tracks extends React.Component {
	constructor(props) {
		super(props);
		this.props.gotoTrackList();
		this.props.setCtxPanToTrackList();
	}

	render() {
		return (
			<main>
				<h1>All</h1>
				<h2>Tracks</h2>
				<ContextPanel/>
				<TrackList data={this.props.data}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Tracks);