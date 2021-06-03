import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ElegirProductos from './ElegirProductos';
import Carrito from './Carrito';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const NuevaVenta = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<ElegirProductos />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Carrito />
				</Grid>
			</Grid>
		</div>
	);
};

export default NuevaVenta;
