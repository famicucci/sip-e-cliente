import React, { useState, useEffect, useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SelectPtoStockVenta from './SelectPtoStockVenta';

const RadioElegirProductos = () => {
	const [value, setValue] = useState('pto-stock');

	useEffect(() => {
		console.log(value);
	}, [value]);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<FormControl component="fieldset">
			<RadioGroup
				row
				aria-label="position"
				name="position"
				onChange={handleChange}
				value={value}
			>
				<FormControlLabel
					value="pto-stock"
					control={<Radio color="primary" />}
					label={<SelectPtoStockVenta />}
				/>
				<FormControlLabel
					value="total"
					control={<Radio color="primary" />}
					label="total"
				/>
				<FormControlLabel
					value="sin-stock"
					control={<Radio color="primary" />}
					label="s/ stock"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default RadioElegirProductos;
