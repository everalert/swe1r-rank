import React from 'react';
import { connect } from 'react-redux';
import Track from '../element/table-track';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';
import { FormatCategoryTitleFromSettings } from '../module/format';


const mapStateToProps = state => {
	return {
		data: state.table,
		tracks: state.levels,
		settings: state.settings
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
			<h1>{FormatCategoryTitleFromSettings(this.props.settings)}</h1>
			<h2>{this.props.tracks[this.trackId].name}</h2>
			<ContextPanel/>
			<Track track={this.trackId} data={this.props.data}/>
		</main>
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(TrackPage);