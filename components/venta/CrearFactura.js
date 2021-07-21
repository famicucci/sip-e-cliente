import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import { Typography, Divider, Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import ProductosCrearFactura from './ProductosCrearFactura';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import ImporteCrearFactura from './ImporteCrearFactura';
import BotonSuccess from '../generales/botones/BontonSuccess';
import NotaCrearFactura from './NotaCrearFactura';
import ConfirmarCrearFactura from './ConfirmarCrearFactura';

const useStyles = makeStyles((theme) => ({
	dividerHorizontal: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	dividerVertical: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
}));

const CrearFactura = () => {
	const classes = useStyles();

	const { traerTiposEnvio } = useContext(VentasContext);
	const {
		filaActiva,
		openModalCrearFactura,
		openModalConfirmarCrearFactura,
		handleOpenModalConfirmarCrearFactura,
		handleCloseModal,
	} = useContext(EditarOrdenesContext);

	useEffect(() => {
		traerTiposEnvio();
	}, []);

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
			<ProductosCrearFactura productos={filaActiva.detalleOrden} />
			<ImporteCrearFactura />
			<NotaCrearFactura />
			<Divider className={classes.dividerHorizontal} variant="fullWidth" />
			<Box className={classes.footer}>
				<BotonSuccess
					type="button"
					contenido="Facturar"
					className={classes.botonAceptar}
					onClick={() => {
						handleOpenModalConfirmarCrearFactura();
					}}
				/>
			</Box>
			{openModalConfirmarCrearFactura ? <ConfirmarCrearFactura /> : null}
		</ModalScroll>
	);
};

export default CrearFactura;
