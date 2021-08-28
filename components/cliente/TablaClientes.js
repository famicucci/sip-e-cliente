import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaCliente from './FilaCliente';
import SpinnerTabla from '../generales/SpinnerTabla';
import ClientesContext from '../../context/clientes/clientesContext';
import FacsOrdsCliente from '../cliente/FacsOrdsCliente';
import InformacionCliente from './InformacionCliente';
import NuevoCliente from './NuevoCliente';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../generales/Alerta';
import Alerta2 from '../generales/Alerta2';
import useFilter from '../../hooks/useFilter';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const TablaClientes = (props) => {
	const classes = useStyles();
	const { columnas } = props;

	const { busqueda } = useContext(BarraHerramientasContext);

	// create a state for this table
	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, busqueda);

	const { alerta } = useContext(AlertaContext);
	const {
		clientes,
		filaActiva,
		openModalInformacionCliente,
		openModalNuevoCliente,
		openInfoCliente,
		mensajeClientes,
		cargando,
		traerClientes,
		handleFilaActiva,
		handleOpenModalInformacionCliente,
	} = useContext(ClientesContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 10);

	useEffect(() => {
		traerClientes();
		setData(clientes);
	}, [clientes]);

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
