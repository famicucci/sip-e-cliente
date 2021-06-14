import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ElegirProductos from './ElegirProductos';
import Carrito from './Carrito';
import Alerta from '../Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '100%',
		padding: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

const NuevaVenta = () => {
	const classes = useStyles();

	const { handleHerrNuevaVenta } = useContext(BarraHerramientasContext);
	const { mensaje } = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	useEffect(() => {
		handleHerrNuevaVenta();
	}, []);

	useEffect(() => {
		if (mensaje) {
			const { msg, categoria } = mensaje;
			mostrarAlerta(msg, categoria);
		}
	}, [mensaje]);

	return (
		<>
			<Grid container spacing={1} style={{ height: '87vh' }}>
				<Grid item xs={12} sm={6}>
					<ElegirProductos />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Carrito />
				</Grid>
			</Grid>
			{alerta !== null ? <Alerta /> : null}
		</>
	);
};

export default NuevaVenta;
