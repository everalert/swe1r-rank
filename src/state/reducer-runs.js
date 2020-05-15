import VAL from './const';
import { merge } from 'lodash';


export const CreateBlankTotalsObj = () => {
	const totals = [], combinedTotals = [];
	Object.keys(VAL.Id.Upgrades.Value).forEach(u => {
		Object.keys(VAL.Id.Skips.Value).forEach(s => {
			combinedTotals.push({
				pts:0,
				time:0,
				skips:VAL.Id.Skips.Value[s],
				upgrades:VAL.Id.Upgrades.Value[u]
			});
			Object.keys(VAL.Id.Category).forEach(l => {
				totals.push({
					pts:0,
					time:0,
					laps:VAL.Id.Category[l],
					skips:VAL.Id.Skips.Value[s],
					upgrades:VAL.Id.Upgrades.Value[u]
				});
			})
		})
	})
	return {
		totals: totals,
		combinedTotals: combinedTotals,
		overallTotals: { pts:0, time:0 }
	}
}


export const CreateBlankPlayerObj = (id,name) => {
	return merge({ id:id, name:name}, CreateBlankTotalsObj());
}


export const CreateBlankLevelObj = (id,name) => {
	const bests = [];
	Object.keys(VAL.Id.Upgrades.Value).forEach(u => {
		Object.keys(VAL.Id.Skips.Value).forEach(s => {
			Object.keys(VAL.Id.Category).forEach(l => {
				bests.push({
					player:null,
					time:3599.99,
					scale:VAL.Score.Scale,
					laps:VAL.Id.Category[l],
					skips:VAL.Id.Skips.Value[s],
					upgrades:VAL.Id.Upgrades.Value[u]
				});
			})
		})
	})
	return {
		abbr: id,
		name: name,
		bests: bests
	}
}


export const CreateBlankRecordScaleArr = () => {
	const bests = [];
	Object.keys(VAL.Id.Upgrades.Value).forEach(u => {
		Object.keys(VAL.Id.Skips.Value).forEach(s => {
			Object.keys(VAL.Id.Category).forEach(l => {
				bests.push({
					time_min:3599.99,
					time_max:0,
					laps:VAL.Id.Category[l],
					skips:VAL.Id.Skips.Value[s],
					upgrades:VAL.Id.Upgrades.Value[u]
				});
			})
		})
	})
	return bests;
}


export const GenerateRunVariations = (data) => {
	// create permutations of possible valid skips/upgrades combos given the input data
	let skips = [true,false], upgrades = [true,false];
	const output = [];
	const skipsInput = data.skips;
	const upgradesInput = data.upgrades;
	skips.forEach(s => {
		upgrades.forEach(u => {
			if ((s||s===skipsInput) && (u||u===upgradesInput))
				output.push(merge({},data,{skips:s,upgrades:u}));
		})
	})
	return output;
}