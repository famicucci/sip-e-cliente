import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from './componentes/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import FilaStockProducto from './componentes/FilaStockProducto';
import Modal from '../modales/stockProducto/Modal';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import Alerta from '../Alerta';
import StockContext from '../../context/stock/stockContext';
import AlertaContext from '../../context/alertas/alertaContext';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 480 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{ id: 4, nombre: '', align: 'center', minWidth: 60 },
];

const TablaStockTotal = () => {
	const classes = useStyles();

	// context barra de herramientas
	const { busqueda, handleHerramientasStockProducto } = useContext(
		BarraHerramientasContext
	);

	// context stock
	const { stocks, filas, mensaje, traerStocksProducto, handleFilasBusqueda } =
		useContext(StockContext);

	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		handleHerramientasStockProducto();
		traerStocksProducto();
	}, []);

	useEffect(() => {
		handleFilasBusqueda(stocks, busqueda);
	}, [stocks]);

	useEffect(() => {
		handleFilasBusqueda(stocks, busqueda);
		setPage(0);
	}, [busqueda]);

	useEffect(() => {
		if (mensaje) {
			const { msg, categoria } = mensaje;
			mostrarAlerta(msg, categoria);
		}
	}, [mensaje]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{cortePagina.map((fila) => (
						<FilaStockProducto key={fila.ProductoCodigo} fila={fila} />
					))}
					{cortePagina.length === 0 ? bodyVacio(columnas) : filasVacias}
				</TableBody>
				<FooterTabla />
			</Table>

			<Modal />
			{alerta !== null ? <Alerta /> : null}
		</TableContainer>
	);
};

export default TablaStockTotal;
