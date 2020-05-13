import React from 'react';
import { connect } from 'react-redux';
import VAL from '../state/const';
import Track from '../element/table-track';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';


const mapStateToProps = state => {
	return {
		data: state.table,
		tracks: state.levels,
		lap: state.settings.lap
	};
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: (trackId) => {
			dispatch(Actions.changeSection('TRACK',trackId));
			dispatch(Actions.updateTable());
			dispatch(Actions.updateCtxPan());
		}
	};
}


class TrackPage extends React.Component {
	constructor(props) {
		super(props);
		this.trackId = this.props.match.params.id;
		this.props.initialize(this.trackId);
	}

	render() {
		if (!this.props.tracks[this.trackId])
			return <main className='error-message'><p>Track {this.trackId} not found.</p></main>
		return <main>
			<h1>{VAL.Setting.Lap[this.props.lap].name}</h1>
			<h2>{this.props.tracks[this.trackId].name}</h2>
			<ContextPanel/>
			<Track track={this.trackId} data={this.props.data}/>
		</main>
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(TrackPage);