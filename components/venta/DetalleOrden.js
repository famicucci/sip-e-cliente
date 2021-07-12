import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import { Typography, Divider } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import Productos from './Productos';
import Envio from './Envio';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			marginBottom: theme.spacing(1),
			width: '100%',
		},
	},
	divider: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
	boton: {
		width: '100%',
		height: '100%',
	},
}));

const DetalleOrden = () => {
	const classes = useStyles();

	const {
		openModalDetalleOrden,
		filaActiva,
		handleCloseModal,
		traerTiposEnvio,
	} = useContext(VentasContext);

	useEffect(() => {
		traerTiposEnvio();
	}, []);

	if (!openModalDetalleOrden) return null;

	return (
		<ModalScroll
			openModal={openModalDetalleOrden}
			handleClose={handleCloseModal}
			padding={16}
		>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				// onSubmit={onSubmit}
			>
				<Typography variant="h5" align="center">
					Orden
				</Typography>
				<Divider className={classes.divider} variant="fullWidth" />
				<Productos productos={filaActiva.detalleOrden} />
				<Envio />
			</form>
		</ModalScroll>
	);
};

export default DetalleOrden;
