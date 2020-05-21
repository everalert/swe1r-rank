//import React from 'react';
import VAL from '../state/const';
import Numeral from 'numeral';
// import Moment from 'moment';
// import MomentDurationFormat from 'moment-duration-format';
// MomentDurationFormat(Moment);

export const DevFormatCategoryMultiplier = (multiplier) => {
	return `${Numeral(multiplier).format(VAL.Setting.Developer.CategoryMultiplierFormat)}×`;
}