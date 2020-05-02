import VAL from '../state/const';
import Numeral from 'numeral';
import Moment from 'moment';
import MomentDurationFormat from 'moment-duration-format';
MomentDurationFormat(Moment);

export const FormatTime = (time) => {
	return Moment.duration(time,'seconds').format(VAL.Setting.Format.Time,{trim:false})
}

export const FormatTotalTime = (time) => {
	return Moment.duration(time,'seconds').format(VAL.Setting.Format.TotalTime,{trim:false})
}

export const FormatFullTotalTime = (time) => {
	return Moment.duration(time,'seconds').format(VAL.Setting.Format.TotalTimeFull,{trim:false})
}

export const FormatPoints = (points) => {
	return Numeral(points).format(VAL.Setting.Format.Points);
}

export const FormatTotalPoints = (points) => {
	return Numeral(points).format(VAL.Setting.Format.TotalPoints);
}