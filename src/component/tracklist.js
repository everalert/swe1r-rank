import React from 'react';
import { connect } from 'react-redux';
import TrackList from '../element/table-tracklist';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';
import { FormatCategoryTitleFromSettings } from '../module/format';


const mapStateToProps = state => {
	return {
		data: state.table,
		settings: state.settings
	};
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: () => {
			dispatch(Actions.changeSection('TRACKLIST'));
			dispatch(Actions.updateTable());
			dispatch(Actions.updateCtxPan());
		}
	};
}


class Tracks extends React.Component {
	constructor(props) {
		super(props);
		this.props.initialize();
	}

	render() {
		return (
			<main>
				<h1>{FormatCategoryTitleFromSettings(this.props.settings)}</h1>
				<h2>Tracks</h2>
				<ContextPanel/>
				<TrackList data={this.props.data}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Tracks);