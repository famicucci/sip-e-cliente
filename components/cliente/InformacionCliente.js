import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Box, Typography, Divider } from '@material-ui/core';

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

const InformacionCliente = () => {
	const classes = useStyles();

	const { filaActiva, openModalInformacionCliente, handleCloseModal } =
		useContext(EditarOrdenesContext);

	console.log(filaActiva);
	if (!openModalInformacionCliente) return null;

	return (
		<ModalScroll
			openModal={openModalInformacionCliente}
			handleClose={handleCloseModal}
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
					<Typography align="left">{`${filaActiva.Cliente.nombre} ${filaActiva.Cliente.apellido}`}</Typography>
				</Box>
			</Box>
		</ModalScroll>
	);
};

export default InformacionCliente;
