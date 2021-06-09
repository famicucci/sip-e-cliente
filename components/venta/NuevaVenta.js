import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ElegirProductos from './ElegirProductos';
import Carrito from './Carrito';
import Alerta from '../Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const NuevaVenta = () => {
	const classes = useStyles();

	const { mensaje } = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	useEffect(() => {
		console.log(mensaje);
		if (mensaje) {
			const { msg, categoria } = mensaje;
			mostrarAlerta(msg, categoria);
		}
	}, [mensaje]);

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
			{alerta !== null ? <Alerta /> : null}
		</div>
	);
};

export default NuevaVenta;
