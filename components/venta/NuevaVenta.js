import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ElegirProductos from './ElegirProductos';
import Carrito from './Carrito';
import Alerta from '../Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const NuevaVenta = () => {
	const { handleHerrNuevaVenta, handleEtiquetaModificarOrden } = useContext(
		BarraHerramientasContext
	);
	const { orderToModify, mensaje, getCart } = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	useEffect(() => {
		handleHerrNuevaVenta();

		if (orderToModify) {
			handleEtiquetaModificarOrden(true);
			console.log('modificando orden');
		}
	}, []);

	useEffect(() => {
		if (mensaje) {
			const { msg, categoria } = mensaje;
			mostrarAlerta(msg, categoria);
		}
	}, [mensaje]);

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<ElegirProductos />
				</Grid>
				<Grid item xs={12} md={6}>
					<Carrito />
				</Grid>
			</Grid>
			{alerta !== null ? <Alerta /> : null}
		</>
	);
};

export default NuevaVenta;
