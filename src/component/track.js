import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import Track from '../element/table-track';
import PageSelector from '../element/page-selector';
import ContextPanel from '../element/ctxpan';
import Actions from '../state/action';

// export default () => {
// 	const dispatch = useDispatch();
// 	const sort = (sorting) => {
// 		dispatch(Actions.sortTrack(sorting.value));
// 		dispatch(Actions.setCtxPanToTrack(track));
// 	};
// 	const menu = useSelector(state => state.menu);
// 	const sorting = useSelector(state => state.trackTab);
// 	const data = useSelector(state => state.table);
// 	const track = useSelector(state => state.page);
// 	const trackName = useSelector(state => state.levels[track].name);

// 	dispatch(Actions.setCtxPanToTrack(track));

// 	return (
// 		<main>
// 			<h1>Track</h1>
// 			<h2>{trackName}</h2>
// 			<PageSelector onChangeHandler={sort} menu={menu} initial={sorting} />
// 			<ContextPanel/>
// 			<Track track={track} data={data}/>
// 		</main>
// 	);
// }


const mapStateToProps = state => {
	return {
		data: state.table,
		tracks: state.levels,
		menu: state.menu,
		sorting: state.trackTab
	};
}

const mapDispatchToProps = dispatch => {
	return {
		setCtxPanToTrack: (id) => dispatch(Actions.setCtxPanToTrack(id)),
		gotoTrack: (id) => dispatch(Actions.gotoTrack(id)),
		sort: (sorting,track) => {
			dispatch(Actions.sortTrack(sorting.value));
			dispatch(Actions.setCtxPanToTrack(track));
		}
	};
}


class TrackPage extends React.Component {
	constructor(props) {
		super(props);
		this.trackId = this.props.match.params.id;
		this.props.gotoTrack(this.trackId);
		this.props.setCtxPanToTrack(this.trackId);
	}

	render() {
		return (
			<main>
				<h1>Track</h1>
				<h2>{this.props.tracks[this.trackId].name}</h2>
				<PageSelector onChangeHandler={(sort) => this.props.sort(sort,this.trackId)} menu={this.props.menu} initial={this.props.sorting} />
				<ContextPanel/>
				<Track track={this.trackId} data={this.props.data}/>
			</main>
		);
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(TrackPage);