import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from './componentes/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import FilaStockProducto from './componentes/FilaStockProducto';
import ModalStockProducto from '../modales/ModalStockProducto';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import StockContext from '../../context/stock/stockContext';

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

const TablaStock = () => {
	const classes = useStyles();

	const { busqueda, handleHerramientasStockProducto } = useContext(
		BarraHerramientasContext
	);

	const { filas } = useContext(StockContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		handleHerramientasStockProducto();
	}, []);

	useEffect(() => {
		setPage(0);
	}, [busqueda]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{cortePagina.map((fila) => (
						<FilaStockProducto key={fila.id} fila={fila} />
					))}
					{cortePagina.length === 0 ? bodyVacio(columnas) : filasVacias}
				</TableBody>
				<FooterTabla />
			</Table>

			<ModalStockProducto />
		</TableContainer>
	);
};

export default TablaStock;
