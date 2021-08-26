import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaCliente from './FilaCliente';
import SpinnerTabla from '../../components/SpinnerTabla';
import ClientesContext from '../../context/clientes/clientesContext';
import FacsOrdsCliente from '../cliente/FacsOrdsCliente';
import InformacionCliente from './InformacionCliente';
import NuevoCliente from './NuevoCliente';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../Alerta';
import Alerta2 from '../generales/Alerta2';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const TablaClientes = (props) => {
	const classes = useStyles();
	const { columnas, busqueda } = props;

	const { alerta } = useContext(AlertaContext);
	const {
		filas,
		filaActiva,
		openModalInformacionCliente,
		openModalNuevoCliente,
		openInfoCliente,
		mensajeClientes,
		cargando,
		traerClientes,
		handleFilas,
		handleFilaActiva,
		handleOpenModalInformacionCliente,
	} = useContext(ClientesContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 5);

	useEffect(() => {
		traerClientes(busqueda);
	}, []);

	useEffect(() => {
		setPage(0);
		handleFilas(busqueda);
	}, [busqueda]);

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
							<FilaCliente key={x.id} fila={x} colIndex={colIndex} />
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
			{openModalInformacionCliente ? (
				<InformacionCliente
					cliente={filaActiva}
					openModalInformacionCliente={openModalInformacionCliente}
					handleCloseModal={() => {
						handleOpenModalInformacionCliente(false);
					}}
					handleFilaActiva={() => {
						handleFilaActiva(null);
					}}
				/>
			) : null}
			{openInfoCliente ? <FacsOrdsCliente /> : null}
			{openModalNuevoCliente ? <NuevoCliente /> : null}
			{alerta !== null ? <Alerta /> : null}
			{mensajeClientes ? <Alerta2 mensaje={mensajeClientes} /> : null}
		</TableContainer>
	);
};

export default TablaClientes;
