import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
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
			dispatch(Actions.changeSection('PLAYERLIST'));
			dispatch(Actions.updateRankList());
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
				<h1>{FormatCategoryTitleFromSettings(this.props.settings)}</h1>
				<h2>Racers</h2>
				<ContextPanel/>
				<RankList panel={true}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Players);