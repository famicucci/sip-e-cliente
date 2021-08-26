import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import VentasContext from '../../context/ventas/ventasContext';

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

	const { listasPrecio, mensaje, traerListasPrecio } = useContext(
		BarraHerramientasContext
	);

	const { listaPrecio, handleListaPrecio } = useContext(VentasContext);

	useEffect(() => {
		traerListasPrecio();
	}, []);

	useEffect(() => {
		if (mensaje) {
			console.log(mensaje);
		}
	}, [mensaje]);

	const handleChange = (e) => {
		const filLis = listasPrecio.find((x) => x.id === e.target.value);
		handleListaPrecio(filLis);
	};

	return (
		<FormControl className={classes.formControl}>
			{listasPrecio ? (
				<Select
					value={listaPrecio.id}
					onChange={handleChange}
					displayEmpty
					className={classes.selectEmpty}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{listasPrecio
						? listasPrecio.map((ptoStock) => (
								<MenuItem key={ptoStock.id} value={ptoStock.id}>
									{ptoStock.descripcion}
								</MenuItem>
						  ))
						: null}
				</Select>
			) : null}
		</FormControl>
	);
};

export default SelectPtoStockVenta;
