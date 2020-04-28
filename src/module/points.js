import VAL from '../state/const';
const { Max, Scale, Precision } = VAL.Score;

export const CalculatePoints = (wr, pb) => {
	return pb > wr*Scale ? 0 : Math.floor(((1-(pb-wr)/(wr*Scale-wr))*Max)*(10^Precision))/(10^Precision);
}

export const TimeNeededForPoints = (wr, points=0) => {
	return (1+(1-points/100) * (Scale-1)) * wr;
}