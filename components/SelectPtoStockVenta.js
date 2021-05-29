import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
		textAlign: 'left',
	},
}));

const SelectPtoStockVenta = () => {
	const classes = useStyles();
	const [ptoStock, setPtoStock] = useState(1);

	const handleChange = (event) => {
		setPtoStock(event.target.value);
	};

	return (
		<FormControl className={classes.formControl} disabled>
			<Select
				value={ptoStock}
				onChange={handleChange}
				displayEmpty
				className={classes.selectEmpty}
				inputProps={{ 'aria-label': 'Without label' }}
			>
				<MenuItem value={1}>Showroom</MenuItem>
				<MenuItem value={2}>Depósito</MenuItem>
				<MenuItem value={3}>Mercado Libre</MenuItem>
				<MenuItem value={3}>Outlet</MenuItem>
			</Select>
		</FormControl>
	);
};

export default SelectPtoStockVenta;
