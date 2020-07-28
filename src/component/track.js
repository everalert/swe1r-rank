import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
import HighlightPanel from '../element/hlpan';
import Actions from '../state/action';
import { FormatCategoryTitle } from '../module/format';


const mapStateToProps = state => {
	return {
		data: state.table,
		tracks: state.levels,
		overall: state.settings.overall,
		skips: state.settings.skips,
		upgrades: state.settings.upgrades,
		lap: state.settings.lap
	};
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: (trackId) => {
			dispatch(Actions.changeSection('TRACK',trackId));
			dispatch(Actions.updateRankList());
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
		return <main className="track">
			<h1>{FormatCategoryTitle(this.props.overall, this.props.skips, this.props.upgrades, this.props.lap)}</h1>
			<h2>{this.props.tracks[this.trackId].name}</h2>
			<RankList wide={true}/>
			<HighlightPanel/>
		</main>
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(TrackPage);