import VAL from '../state/const';
const { Max, Scale, ScaleMin, ScaleMax, Precision } = VAL.Score;

export const CalculatePoints = (wr, pb, scale=Scale) => {
	return pb > wr*scale ? 0 : Math.floor(((1-(pb-wr)/(wr*scale-wr))*Max)*(10^Precision))/(10^Precision);
}

export const TimeNeededForPoints = (wr, scale=Scale, points=0) => {
	return (1+(1-points/100) * (scale-1)) * wr;
}

export const CalculateLevelScale = (wrMin, wrMax, time) => {
	return (1-(time-wrMin)/(wrMax-wrMin))*(ScaleMax-ScaleMin)+ScaleMin;
}