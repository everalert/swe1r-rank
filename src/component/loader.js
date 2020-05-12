import React from 'react';
import { connect } from 'react-redux';
import VAL from '../state/const';
import Actions from '../state/action';


const mapStateToProps = state => {
	return {	
		//title: state.Text.TITLE[state.Content.Section]
	};
}

const mapDispatchToProps = dispatch => {
	return {
		clearData: () => dispatch(Actions.clearData()),
		addRun: (run,players,platforms,variables) => dispatch(Actions.addRun(run,players,platforms,variables)),
		calcTime: () => dispatch(Actions.calcTime()),
		calcPts: () => dispatch(Actions.calcPoints()),
		finalize: () => dispatch(Actions.markLoaded())
	};
}


class Api extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			data: undefined
		}
	}

	componentDidMount() {
		this.props.clearData();
		const promises = [];
		let game = VAL.Id.Game;
		Object.keys(VAL.Id.Level).forEach(level => {
			Object.keys(VAL.Id.Category).forEach(category => {
				let url = VAL.Api.Url.replace('%GAM%',game).replace('%LVL%',level).replace('%CAT%',category);
				promises.push(url);
			})
		})
		Promise.all(promises.map(url => 
			fetch(url)
				.then(res => res.json())
				.then(result => {
						this.setState({ isLoaded: true });
						result.data.runs.forEach(r => this.props.addRun(r,
							result.data.players,
							result.data.platforms,
							result.data.variables)
						);
					}, error => { this.setState({ isLoaded: true, error })
				})
		))
		.then(()=>{
			if (!this.state.error) {
				this.props.calcPts();
				this.props.calcTime();
				this.props.finalize();
			}
		})
	}

	render() {
		const { isLoaded, error } = this.state;
		if (error) {
			return <div className="load-screen">{error.message}</div>;
		}
		else if (!isLoaded) {
			return <div className="load-screen">Loading...</div>;
		}
		else {
			return '';
		}
	}

}

export default connect(mapStateToProps,mapDispatchToProps)(Api);