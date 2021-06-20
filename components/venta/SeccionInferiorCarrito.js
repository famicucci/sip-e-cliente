import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TotalCarrito from './TotalCarrito';
import BotoneraCarrito from './BotoneraCarrito';
import NotaVenta from './NotaVenta';
import VerMasCarrito from './VerMasCarrito';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import ClienteCarr from './ClienteCarr';
import ModalClienteCarr from './modales/ModalClienteCarr';
import ModalCentrado from '../venta/modales/ModalCentrado';
import AgregarEnvioCarr from './AgregarEnvioCarr';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(0.5),
		padding: theme.spacing(1.5),
	},
}));

const SeccionInferiorCarrito = () => {
	const classes = useStyles();

	const { openNota, openVerMas, openModalEnvio } =
		useContext(BotoneraCarrContext);

	return (
		<Paper className={classes.root} variant="elevation">
			<TotalCarrito />
			<ClienteCarr />
			<Divider variant="fullWidth" />
			<BotoneraCarrito />
			{openNota || openVerMas ? <Divider variant="fullWidth" /> : null}
			<NotaVenta />
			<VerMasCarrito />
			<ModalClienteCarr />
			<ModalCentrado
				contenido={<AgregarEnvioCarr />}
				openModal={openModalEnvio}
			/>
		</Paper>
	);
};

export default SeccionInferiorCarrito;
