export const CalcElementScreenPosY = (element, windowH) => {
	const bounds = element.getBoundingClientRect();
	if (bounds.bottom<=0 || bounds.top>=windowH)
		return 50;
	return (bounds.top+bounds.height)/(windowH+bounds.height*2)*100;
}