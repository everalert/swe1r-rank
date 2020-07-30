import React from 'react';
import { connect } from 'react-redux';
import RankList from '../element/ranklist';
import HighlightPanel from '../element/hlpan';
import Actions from '../state/action';
import CategoryString from '../element/category-string';


const mapDispatchToProps = dispatch => {
	return {
		initialize: (section,pageId) => {
			dispatch(Actions.changeSection(section, pageId));
			dispatch(Actions.updateRankList());
			dispatch(Actions.updateCtxPan());
		}
	};
}


class RankListPage extends React.Component {
	constructor(props) {
		super(props);
		this.pageId = this.props.match.params.id; // from react-router
		this.props.initialize(this.props.section, this.pageId);
	}

	render() {
		if (this.props.pageData && !this.props.pageData[this.pageId])
			return <main className='error-message'><p>{this.pageId} not found.</p></main>
		
		const main_title = this.props.pageData ? this.props.pageData[this.pageId].name : this.props.title;
		const cat_title = <CategoryString laps={this.props.laps || undefined}/>;
		return <main className={this.props.className}>
			<h1>{this.props.reverseTitles ? cat_title : main_title}</h1>
			<h2>{this.props.reverseTitles ? main_title : cat_title}</h2>
			<RankList wide={true}/>
			<HighlightPanel/>
			{this.props.children}
		</main>
	}
}


export default connect(null,mapDispatchToProps)(RankListPage);