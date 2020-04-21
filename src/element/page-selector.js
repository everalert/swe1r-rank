import React from 'react';
import Select from 'react-select';


export default (props) => {
	const initial = props.menu.filter(i => i.value===props.initial)[0];
	return (
		<div className='page-selector'>
			<Select
				onChange={props.onChangeHandler}
				options={props.menu}
				defaultValue={initial}
				className='menu-container'
				classNamePrefix='menu'
			/>
		</div>
	);
}