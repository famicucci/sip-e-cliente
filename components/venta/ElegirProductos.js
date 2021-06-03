import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BuscarProducto from './BuscarProducto';
import RadioElegirProductos from './RadioElegirProductos';
import TablaElegirProducto from '../tablas/TablaElegirProducto';
import SelectListaPrecio from './SelectListaPrecioVenta';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

const ElegirProductos = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper} variant="outlined">
			<BuscarProducto />
			<RadioElegirProductos />
			<SelectListaPrecio />
			<TablaElegirProducto />
		</Paper>
	);
};

export default ElegirProductos;
