import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BuscarProducto from './BuscarProducto';
import RadioElegirProductos from './RadioElegirProductos';
import TablaElegirProducto from '../components/tablas/TablaElegirProducto';
import SelectListaPrecio from './SelectListaPrecioVenta';
import TablaCarrito from './tablas/TablaCarrito';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

const NuevaVenta = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper} variant="outlined">
						<BuscarProducto />
						<RadioElegirProductos />
						<SelectListaPrecio />
						<TablaElegirProducto />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper} variant="outlined">
						<TablaCarrito />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default NuevaVenta;
