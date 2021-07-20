import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import { Typography, Divider, Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import Productos from './Productos';
import EnvioDetalleOrden from './EnvioDetalleOrden';
import MasInformacion from './MasInformacion';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';

const useStyles = makeStyles((theme) => ({
	dividerHorizontal: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	dividerVertical: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
}));

const CrearFactura = () => {
	const classes = useStyles();

	const { traerTiposEnvio } = useContext(VentasContext);
	const { filaActiva, openModalCrearFactura, handleCloseModal } =
		useContext(EditarOrdenesContext);

	useEffect(() => {
		traerTiposEnvio();
	}, []);

	// if (!openModalCrearFactura) return null;

	return (
		<ModalScroll
			openModal={openModalCrearFactura}
			handleClose={handleCloseModal}
			padding={16}
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
			<EnvioDetalleOrden />
			<MasInformacion />
		</ModalScroll>
	);
};

export default CrearFactura;
