import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import VentasContext from '../context/ventas/ventasContext';

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

	const { ptosStock, ptoStock, valorRadio, handlePtoStock, traerPtosStock } =
		useContext(VentasContext);

	useEffect(() => {
		traerPtosStock();
	}, []);

	let props = {};
	if (valorRadio !== 'pto-stock') {
		props = {
			disabled: 'true',
		};
	}

	const handleChange = (e) => {
		const filaPtoStock = ptosStock.find((x) => x.id === e.target.value);
		handlePtoStock(filaPtoStock);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				value={ptoStock.id}
				onChange={handleChange}
				displayEmpty
				className={classes.selectEmpty}
				inputProps={{ 'aria-label': 'Without label' }}
				{...props}
			>
				{ptosStock
					? ptosStock.map((x) => (
							<MenuItem key={x.id} value={x.id}>
								{x.descripcion}
							</MenuItem>
					  ))
					: null}
			</Select>
		</FormControl>
	);
};

export default SelectPtoStockVenta;
