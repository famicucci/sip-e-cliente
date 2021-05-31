import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BarraHerramientasContext from '../context/barraHerramientas/barraHerramientasContext';
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

	const { ptosStock, mensaje, traerPtosStock } = useContext(
		BarraHerramientasContext
	);

	const { ptoStock, handlePtoStock } = useContext(VentasContext);

	useEffect(() => {
		traerPtosStock();
	}, []);

	useEffect(() => {
		if (mensaje) {
			console.log(mensaje);
		}
	}, [mensaje]);

	const handleChange = (event) => {
		handlePtoStock(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				value={ptoStock}
				onChange={handleChange}
				displayEmpty
				className={classes.selectEmpty}
				inputProps={{ 'aria-label': 'Without label' }}
			>
				{ptosStock
					? ptosStock.map((ptoStock) => (
							<MenuItem key={ptoStock.id} value={ptoStock.id}>
								{ptoStock.descripcion}
							</MenuItem>
					  ))
					: null}
			</Select>
		</FormControl>
	);
};

export default SelectPtoStockVenta;
