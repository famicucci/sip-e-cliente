import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import SpinnerTabla from '../../components/SpinnerTabla';
import FacsOrdsCliente from '../cliente/FacsOrdsCliente';
import VentasContext from '../../context/ventas/ventasContext';
import FilaEditarOrdenes from '../venta/FilaEditarOrdenes';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import DetalleOrden from './DetalleOrden';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import InformacionCliente from '../cliente/InformacionCliente';
import CrearFactura from './CrearFactura';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Nº', align: 'center', minWidth: 60 },
	{ id: 2, nombre: 'Estado', align: 'center', minWidth: 110 },
	{ id: 7, nombre: 'Cliente', align: 'center', minWidth: 110 },
	{ id: 3, nombre: 'Fecha', align: 'center', minWidth: 80 },
	{ id: 4, nombre: 'Nº Fact.', align: 'center', minWidth: 100 },
	{ id: 5, nombre: 'Estado Pago', align: 'center', minWidth: 110 },
	{ id: 6, nombre: 'M. Envío', align: 'center', minWidth: 80 },
	{
		id: 8,
		nombre: 'Nota',
		align: 'center',
		minWidth: 60,
		boton: true,
		contenidoBoton: <NoteOutlinedIcon />,
	},
];

const TablaEditarOrdenes = () => {
	const classes = useStyles();

	// const {
	// 	ordenes,
	// 	filas,
	// 	traerOrdenes,
	// 	cargando,
	// 	handleFilasOrdenes,
	// 	handleFilasOrdenesFiltro,
	// 	traerEstadosOrden,
	// } = useContext(VentasContext);
	const {
		ordenes,
		filas,
		cargando,
		traerOrdenes,
		traerEstadosOrden,
		handleFilasOrdenes,
		traerTiposEnvio,
		traerPtosVenta,
		openModalInformacionCliente,
		openModalCrearFactura,
	} = useContext(EditarOrdenesContext);

	const { handleHerramientasEditarVentas, busqueda } = useContext(
		BarraHerramientasContext
	);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 10);

	useEffect(() => {
		handleHerramientasEditarVentas();
		traerOrdenes();
		traerEstadosOrden();
		traerTiposEnvio();
		traerPtosVenta();
	}, []);

	useEffect(() => {
		setPage(0);
		handleFilasOrdenes();
	}, [ordenes]);

	// useEffect(() => {
	// 	setPage(0);
	// 	handleFilasOrdenesFiltro(busqueda);
	// }, [busqueda]);

	// extraer los id de las columnas
	const colIndex = columnas.reduce(
		(acc, el) => ({ ...acc, [el.nombre]: el }),
		{}
	);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{!cargando ? (
						cortePagina.map((x) => (
							<FilaEditarOrdenes key={x.id} fila={x} colIndex={colIndex} />
						))
					) : (
						<SpinnerTabla cantColumnas={3} />
					)}
					{cortePagina.length === 0 && !cargando
						? bodyVacio(columnas)
						: filasVacias}
				</TableBody>
				{!cargando ? <FooterTabla /> : null}
			</Table>
			<FacsOrdsCliente />
			<DetalleOrden />
			{openModalInformacionCliente ? <InformacionCliente /> : null}
			{openModalCrearFactura ? <CrearFactura /> : null}
		</TableContainer>
	);
};

export default TablaEditarOrdenes;
