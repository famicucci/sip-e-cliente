import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import { Typography, Divider, Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import Productos from './Productos';
import Envio from './Envio';
import MasInformacion from './MasInformacion';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			marginBottom: theme.spacing(1),
			width: '100%',
		},
	},
	dividerHorizontal: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	dividerVertical: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
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
				<Box display="flex" justifyContent="flex-center" alignItems="flex-end">
					<Box>
						<Typography variant="h5" align="left">
							{`Orden ${filaActiva.id}`}
						</Typography>
					</Box>
					<Divider
						className={classes.dividerVertical}
						orientation="vertical"
						variant="inset"
						flexItem
					/>
					<Box>
						<Typography align="left">{`${filaActiva.Cliente.nombre} ${filaActiva.Cliente.apellido}`}</Typography>
					</Box>
				</Box>
				<Divider className={classes.dividerHorizontal} variant="fullWidth" />
				<Productos productos={filaActiva.detalleOrden} />
				<Envio />
				<MasInformacion />
			</form>
		</ModalScroll>
	);
};

export default DetalleOrden;
