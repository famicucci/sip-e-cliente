import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import FilaPuntoStock from './FilaPuntoStock';
import Alerta from '../generales/Alerta';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import StockContext from '../../context/stock/stockContext';
import AlertaContext from '../../context/alertas/alertaContext';
import SpinnerTabla from '../generales/SpinnerTabla';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	spinner: { height: '86vh' },
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 480 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{ id: 4, nombre: '', align: 'center', minWidth: 60 },
];

const TablaPuntoStock = () => {
	const classes = useStyles();

	// context barra de herramientas
	const { busqueda, handleHerramientasStockPtoStock } = useContext(
		BarraHerramientasContext
	);

	// context stock
	const {
		stocks,
		filas,
		ptoStock,
		mensaje,
		cargando,
		traerStocksPtoStock,
		handleFilasPtoStock,
	} = useContext(StockContext);

	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		handleHerramientasStockPtoStock();
		traerStocksPtoStock(busqueda);
	}, []);

	useEffect(() => {
		handleFilasPtoStock(busqueda);
		setPage(0);
	}, [stocks, ptoStock, busqueda]);

	useEffect(() => {
		if (mensaje) {
			const { msg, categoria } = mensaje;
			mostrarAlerta(msg, categoria);
		}
	}, [mensaje]);

	return (
		<TableContainer component={Paper}>
			{!cargando ? (
				<Table className={classes.table}>
					<HeadTabla columnas={columnas} />
					<TableBody>
						{cortePagina.map((fila) => (
							<FilaPuntoStock key={fila.ProductoCodigo} fila={fila} />
						))}
						{cortePagina.length === 0 ? bodyVacio(columnas) : filasVacias}
					</TableBody>
					<FooterTabla />
				</Table>
			) : (
				<Box className={classes.spinner}>
					<SpinnerTabla />
				</Box>
			)}
			{alerta !== null ? <Alerta /> : null}
		</TableContainer>
	);
};

export default TablaPuntoStock;
