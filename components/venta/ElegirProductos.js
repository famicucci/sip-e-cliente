import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BuscarProducto from './BuscarProducto';
import RadioElegirProductos from './RadioElegirProductos';
import SelectListaPrecio from './SelectListaPrecioVenta';
import TablaElegirProducto from '../tablas/TablaElegirProducto';
import Paper from '@material-ui/core/Paper';
import VentasContext from '../../context/ventas/ventasContext';
import LectorElegirProducto from './LectorElegirProducto';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '100%',
		padding: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

const ElegirProductos = () => {
	const classes = useStyles();

	const { modo } = useContext(VentasContext);

	return (
		<Paper className={classes.paper} variant="outlined">
			{modo === 'manual' ? (
				<>
					<BuscarProducto />
					<RadioElegirProductos />
					<SelectListaPrecio />
					<TablaElegirProducto />
				</>
			) : (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justify="center"
				>
					<Grid item xs={3}>
						<LectorElegirProducto />
					</Grid>
				</Grid>
			)}
		</Paper>
	);
};

export default ElegirProductos;
