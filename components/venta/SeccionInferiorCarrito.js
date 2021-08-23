import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TotalCarrito from './TotalCarrito';
import BotoneraCarrito from './BotoneraCarrito';
import NotaVenta from './NotaVenta';
import VerMasCarrito from './VerMasCarrito';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import ClienteCarr from './ClienteCarr';
import AgregarClienteCarr from '../venta/AgregarClienteCarr';
import AgregarEnvioCarr from './AgregarEnvioCarr';
import VentasContext from '../../context/ventas/ventasContext';
import BotoneraModificarOrden from './BotoneraModificarOrden';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(0.5),
		padding: theme.spacing(1.5),
	},
}));

const SeccionInferiorCarrito = () => {
	const classes = useStyles();

	const { openModalAgregarEnvioCarrito, openNota, openVerMas } =
		useContext(BotoneraCarrContext);

	const { traerTiposEnvio, orderToModify } = useContext(VentasContext);

	useEffect(() => {
		// poner los tipos de envio al state ventas
		traerTiposEnvio();

		if (localStorage.getItem('orderToModify')) {
			restoreCart(JSON.parse(localStorage.getItem('carrito')));
		}
	}, []);

	return (
		<Paper className={classes.root} variant="elevation">
			<TotalCarrito />
			<ClienteCarr />
			<Divider variant="fullWidth" />
			{!orderToModify ? <BotoneraCarrito /> : <BotoneraModificarOrden />}
			{openNota || openVerMas ? <Divider variant="fullWidth" /> : null}
			<NotaVenta />
			<VerMasCarrito />
			<AgregarClienteCarr />
			{openModalAgregarEnvioCarrito ? <AgregarEnvioCarr /> : null}
		</Paper>
	);
};

export default SeccionInferiorCarrito;
