import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalScroll from '../generales/ModalScroll';
import { Typography, Divider, Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import ProductosCrearFactura from './ProductosCrearFactura';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import ImporteCrearFactura from './ImporteCrearFactura';
import BotonSuccess from '../generales/botones/BotonSuccess';
import NotaCrearFactura from './NotaCrearFactura';
import ConfirmarCrearFactura from './ConfirmarCrearFactura';
import { Factura } from '../../functions/Factura';

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
		handleFactura,
		crearFactura,
		handleCloseModalConfirmarCrearFactura,
	} = useContext(EditarOrdenesContext);

	const [factura, setFactura] = useState({
		OrdenId: filaActiva.id,
		ClienteId: filaActiva.Cliente.id,
		tarifaEnvio: filaActiva.tarifaEnvio,
		tipo: 'fac',
		estado: 'v',
		estadoPago: 'Pendiente',
		observaciones: '',
		detalleFactura: filaActiva.detalleOrden,
	});

	useEffect(() => {
		traerTiposEnvio();

		// const objFactura = {
		// 	OrdenId: filaActiva.id,
		// 	ClienteId: filaActiva.Cliente.id,
		// 	tipo: 'fac',
		// 	estado: 'v',
		// 	estadoPago: 'Pendiente',
		// };

		// handleFactura(factura);
	}, []);

	const onChangeObservaciones = (observaciones) => {
		setFactura({ ...factura, observaciones: observaciones });
	};

	const onChangeImportes = (importe, descuento, importeFinal) => {
		setFactura({
			...factura,
			importe: importe,
			descuento: descuento,
			importeFinal: importeFinal,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// const factura = new Factura();

		// const factura = {
		// 	OrdenId: filaActiva.id,
		// 	ClienteId: filaActiva.Cliente.id,
		// 	tipo: 'fac',
		// 	estado: 'v',
		// 	estadoPago: 'Pendiente',
		// 	detalleFactura: filaActiva.detalleOrden,
		// };

		// submit
		crearFactura(factura);
		handleCloseModalConfirmarCrearFactura();
	};

	return (
		<form
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
			id="form-crear-factura"
		>
			<ModalScroll
				openModal={openModalCrearFactura}
				handleClose={handleCloseModal}
				padding={16}
			>
				<Box display="flex" justifyContent="flex-center" alignItems="flex-end">
					<Box>
						<Typography variant="h5" align="left">
							{`Facturar orden ${filaActiva.id}`}
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
				<ImporteCrearFactura funcModState={onChangeImportes} />
				<NotaCrearFactura funcModState={onChangeObservaciones} />
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
		</form>
	);
};

export default CrearFactura;
