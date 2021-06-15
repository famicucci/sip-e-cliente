import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BuscarProducto from './BuscarProducto';
import RadioElegirProductos from './RadioElegirProductos';
import SelectListaPrecio from './SelectListaPrecioVenta';
import TablaElegirProducto from '../tablas/TablaElegirProducto';

const useStyles = makeStyles(() => ({
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
}));

const ManualElegirProducto = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Box>
				<BuscarProducto />
				<RadioElegirProductos />
				<SelectListaPrecio />
			</Box>
			<TablaElegirProducto />
		</div>
	);
};

export default ManualElegirProducto;
