import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from './componentes/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import FilaMovimientoStock from './componentes/FilaMovimientoStock';
import StockContext from '../../context/stock/stockContext';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

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
	{ id: 4, nombre: 'Pto. Stock', align: 'center', minWidth: 110 },
	{ id: 5, nombre: 'Fecha', align: 'center', minWidth: 110 },
	{ id: 6, nombre: 'Usuario', align: 'center', minWidth: 100 },
	{ id: 7, nombre: 'Motivo', align: 'center', minWidth: 100 },
];

const TablaMovimientos = () => {
	const classes = useStyles();

	// context barra de herramientas
	const { busqueda, handleHerramientasMovimientosStock } = useContext(
		BarraHerramientasContext
	);

	// context stock
	const { stocks, filas, traerMovimientosStock, handleFilasBusqueda } =
		useContext(StockContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		traerMovimientosStock();
		handleHerramientasMovimientosStock();
	}, []);

	useEffect(() => {
		handleFilasBusqueda(stocks, busqueda);
	}, [stocks]);

	useEffect(() => {
		handleFilasBusqueda(stocks, busqueda);
		setPage(0);
	}, [busqueda]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{cortePagina.map((fila) => (
						<FilaMovimientoStock key={fila.id} fila={fila} />
					))}
					{cortePagina.length === 0 ? bodyVacio(columnas) : filasVacias}
				</TableBody>
				<FooterTabla />
			</Table>
		</TableContainer>
	);
};

export default TablaMovimientos;
