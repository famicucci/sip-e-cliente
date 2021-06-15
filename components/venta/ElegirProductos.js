import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import VentasContext from '../../context/ventas/ventasContext';
import LectorElegirProducto from './LectorElegirProducto';
import ManualElegirProducto from './ManualElegirProducto';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '86vh',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
}));

const ElegirProductos = () => {
	const classes = useStyles();

	const { modo } = useContext(VentasContext);

	return (
		<Paper className={classes.paper} variant="outlined">
			{modo === 'manual' ? <ManualElegirProducto /> : <LectorElegirProducto />}
		</Paper>
	);
};

export default ElegirProductos;
