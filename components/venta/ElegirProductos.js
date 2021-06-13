import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BuscarProducto from './BuscarProducto';
import RadioElegirProductos from './RadioElegirProductos';
import TablaElegirProducto from '../tablas/TablaElegirProducto';
import SelectListaPrecio from './SelectListaPrecioVenta';
import Paper from '@material-ui/core/Paper';
import VentasContext from '../../context/ventas/ventasContext';
import LectorElegirProducto from './LectorElegirProducto';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

const ElegirProductos = () => {
	const classes = useStyles();

	const { modo } = useContext(VentasContext);

	return (
		<>
			{modo === 'manual' ? (
				<Paper className={classes.paper} variant="outlined">
					<BuscarProducto />
					<RadioElegirProductos />
					<SelectListaPrecio />
					<TablaElegirProducto />
				</Paper>
			) : (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justify="center"
					style={{ minHeight: '86vh' }}
				>
					<Grid item xs={3}>
						<LectorElegirProducto />
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default ElegirProductos;
