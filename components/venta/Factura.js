import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Box, Divider } from '@material-ui/core';
import ModalScroll2 from '../generales/ModalScroll2';
import { ClienteBD } from '../../functions/Cliente';
import { FacturaBD } from '../../functions/Factura';
import TablaListaProductos from '../generales/TablaListaProductos';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';
import PagosFactura from './PagosFactura';

const useStyles = makeStyles((theme) => ({
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	contenido: { fontSize: theme.typography.pxToRem(17) },
	divider: { marginTop: theme.spacing(3), marginBottom: theme.spacing(0) },
	boxPadre: { width: '100%' },
	boxImportes: { width: '50%' },
}));

const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 300 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{ id: 4, nombre: 'Precio', align: 'center', minWidth: 100 },
	{ id: 5, nombre: 'Total', align: 'center', minWidth: 100 },
];

const Factura = () => {
	const classes = useStyles();

	const {
		filaActiva,
		openModalFactura,
		handleCloseModal,
		handleFilaActivaOrden,
	} = useContext(EditarOrdenesContext);

	const cliente = new ClienteBD(filaActiva.Cliente);
	const factura = new FacturaBD(filaActiva.Factura);

	return (
		<ModalScroll2
			openModal={openModalFactura}
			handleClose={() => {
				handleCloseModal();
				handleFilaActivaOrden(null);
			}}
			padding={16}
			titulo={`Factura ${factura.id}`}
			anexoTitulo={cliente.nombreCompleto}
		>
			<TablaListaProductos
				productos={filaActiva.Factura.detalleFactura}
				columnas={columnas}
			/>
			<Divider className={classes.divider} variant="fullWidth" />
			<Box
				className={classes.boxPadre}
				display="flex"
				justifyContent="flex-end"
			>
				<Box className={classes.boxImportes}>
					<ImporteFlexGrow titulo="subtotal" childrenNumDecimal>
						{factura.importe}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="descuento" childrenNumDecimal>
						{factura.descuento}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="envio" childrenNumDecimal>
						{factura.tarifaEnvio}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="importe total" childrenNumDecimal>
						{factura.importeFinal}
					</ImporteFlexGrow>
				</Box>
			</Box>
			<PagosFactura />
		</ModalScroll2>
	);
};

export default Factura;
