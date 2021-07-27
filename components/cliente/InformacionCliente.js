import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Box, Typography, Divider } from '@material-ui/core';
import DatosCliente from './DatosCliente';
import ContactoCliente from './ContactoCliente';
import MasDatosCliente from './MasDatosCliente';
import DomicilioCliente from './DomicilioCliente';

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

const InformacionCliente = (props) => {
	const classes = useStyles();

	// const {
	// 	props.filaActiva,
	// 	props.openModalInformacionCliente,
	// 	props.handleCloseModal,
	// 	props.handleFilaActivaOrden,
	// } = useContext(EditarOrdenesContext);

	if (!props.openModalInformacionCliente) return null;

	return (
		<ModalScroll
			openModal={props.openModalInformacionCliente}
			handleClose={() => {
				props.handleCloseModal();
				props.handleFilaActiva(null);
			}}
			padding={16}
		>
			<Box display="flex" justifyContent="flex-center" alignItems="flex-end">
				<Box>
					<Typography variant="h5" align="left">
						Cliente
					</Typography>
				</Box>
				<Divider
					className={classes.dividerVertical}
					orientation="vertical"
					variant="inset"
					flexItem
				/>
				<Box>
					<Typography align="left">{`${props.cliente.nombre} ${props.cliente.apellido}`}</Typography>
				</Box>
			</Box>
			<Divider className={classes.dividerHorizontal} variant="fullWidth" />

			<DatosCliente cliente={props.cliente} />
			<ContactoCliente cliente={props.cliente} />
			<DomicilioCliente cliente={props.cliente} />
			<MasDatosCliente cliente={props.cliente} />
		</ModalScroll>
	);
};

export default InformacionCliente;
