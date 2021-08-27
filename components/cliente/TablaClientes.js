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
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const TablaClientes = () => {
	const classes = useStyles();

	const { busqueda, handleHerramientasClientes } = useContext(
		BarraHerramientasContext
	);

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
		handleOpenFacsOrdsCliente,
	} = useContext(ClientesContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 10);

	useEffect(() => {
		handleHerramientasClientes();
	}, []);

	useEffect(() => {
		traerClientes();
		setData(clientes);
	}, [clientes]);

	// columnas de la tabla
	const columnas = [
		{ id: 1, nombre: 'Nombre y Apellido', align: 'left', minWidth: 230 },
		{ id: 2, nombre: 'Email', align: 'left', minWidth: 240 },
		{ id: 7, nombre: 'Celular', align: 'left', minWidth: 125 },
		{ id: 3, nombre: 'Razon Social', align: 'left', minWidth: 200 },
		{ id: 4, nombre: 'Observaciones', align: 'left', minWidth: 150 },
		{ id: 5, nombre: 'Cond. IVA', align: 'left', minWidth: 180 },
		{ id: 6, nombre: 'Creación', align: 'center', minWidth: 110 },
		{ id: 8, nombre: 'Tipo', align: 'center', minWidth: 100 },
		{
			id: 9,
			nombre: 'Direcciones',
			align: 'left',
			minWidth: 60,
			boton: true,
			contenidoBoton: <RoomOutlinedIcon />,
			funcBoton: null,
		},
		{
			id: 10,
			nombre: 'Ver Más',
			align: 'left',
			minWidth: 60,
			boton: true,
			contenidoBoton: <AccountBalanceWalletIcon />,
			funcBoton: handleOpenFacsOrdsCliente,
		},
	];

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
