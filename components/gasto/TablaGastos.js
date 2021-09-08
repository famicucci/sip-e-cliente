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
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import EditarGasto from './EditarGasto';
import CrearGasto from './CrearGasto';
import Alerta2 from '../generales/Alerta2';

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
	{ id: 5, nombre: 'Importe\xa0($)', align: 'center', minWidth: 100 },
	{ id: 6, nombre: '', align: 'center', minWidth: 60 },
];

const TablaGastos = () => {
	const classes = useStyles();

	const { busqueda, handleToolsExpenses } = useContext(
		BarraHerramientasContext
	);
	const {
		expenses,
		getExpenses,
		openModalEditExpense,
		openModalCreateExpense,
		loading,
		mensajeGastos,
	} = useContext(GastoContext);
	const {
		expenseCategories,
		expenseSubcategories,
		getCategorieExpenses,
		getSubcategorieExpenses,
	} = useContext(GlobalDataContext);

	const [data, setData] = useState([]);
	const [filteredData] = useFilter(data, busqueda);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filteredData, 25);

	useEffect(() => {
		getExpenses();

		if (!expenseCategories && !expenseSubcategories) {
			getCategorieExpenses();
			getSubcategorieExpenses();
		}

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
						cortePagina.map((x) => <FilaGastos key={x.id} fila={x} />)
					) : (
						<SpinnerTabla cantColumnas={3} />
					)}
					{cortePagina.length === 0 && !loading
						? bodyVacio(columnas)
						: filasVacias}
				</TableBody>
				{!loading ? <FooterTabla /> : null}
			</Table>
			{openModalEditExpense ? <EditarGasto /> : null}
			{openModalCreateExpense ? <CrearGasto /> : null}
			{mensajeGastos ? <Alerta2 mensaje={mensajeGastos} /> : null}
		</TableContainer>
	);
};

export default TablaGastos;
