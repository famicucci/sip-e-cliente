import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import SpinnerTabla from '../generales/SpinnerTabla';
import useFilter from '../../hooks/useFilter';
import GastoContext from '../../context/gasto/GastoContext';
import FilaGastos from './FilaGastos';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Estado', align: 'center', minWidth: 60 },
	{ id: 2, nombre: 'Fecha', align: 'center', minWidth: 110 },
	{ id: 7, nombre: 'Categoría', align: 'left', minWidth: 110 },
	{ id: 3, nombre: 'Subcategoría', align: 'left', minWidth: 80 },
	{ id: 4, nombre: 'Descripción', align: 'left', minWidth: 100 },
	{ id: 4, nombre: 'Importe', align: 'center', minWidth: 100 },
];

const TablaGastos = () => {
	const classes = useStyles();

	const { busqueda, handleToolsExpenses } = useContext(
		BarraHerramientasContext
	);
	const { expenses, getExpenses, loading } = useContext(GastoContext);

	const [data, setData] = useState([]);
	console.log(data);
	const [filteredData] = useFilter(data, busqueda);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 25);

	useEffect(() => {
		getExpenses();
		handleToolsExpenses();
	}, []);

	useEffect(() => {
		setData(expenses);
	}, [expenses]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{!loading ? (
						cortePagina.map((x) => (
							<FilaGastos key={x.ProductoCodigo} fila={x} />
						))
					) : (
						<SpinnerTabla cantColumnas={3} />
					)}
					{cortePagina.length === 0 && !loading
						? bodyVacio(columnas)
						: filasVacias}
				</TableBody>
				{!loading ? <FooterTabla /> : null}
			</Table>
		</TableContainer>
	);
};

export default TablaGastos;
