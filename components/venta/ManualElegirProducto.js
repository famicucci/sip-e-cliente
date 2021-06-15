import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BuscarProducto from './BuscarProducto';
import RadioElegirProductos from './RadioElegirProductos';
import SelectListaPrecio from './SelectListaPrecioVenta';
import TablaElegirProducto from '../tablas/TablaElegirProducto';

const useStyles = makeStyles(() => ({
	contenedor: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	tabla: {
		flexGrow: 1,
		marginTop: 10,
	},
}));

const ManualElegirProducto = () => {
	const classes = useStyles();

	return (
		<Box className={classes.contenedor}>
			<Box>
				<BuscarProducto />
				<RadioElegirProductos />
				<SelectListaPrecio />
			</Box>
			<Box className={classes.tabla}>
				<TablaElegirProducto />
			</Box>
		</Box>
	);
};

export default ManualElegirProducto;
