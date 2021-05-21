import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';
import PreciosContext from '../../context/precios/preciosContext';
import HeadTabla from './componentes/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaPrecio from '../tablas/componentes/FilaPrecio';
import { filtrado, filtraListaPrecio } from '../../functions/filtroTablas.js';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 480 },
	{ id: 3, nombre: 'Precio ($)', align: 'center', minWidth: 100 },
];

const TablaPrecios = () => {
	const classes = useStyles();

	// barra de herramientas
	const {
		busqueda,
		lista,
		setBuscador,
		setSelectListaPrecio,
		setSelectPuntoStock,
	} = useContext(BarraHerramientasContext);

	// traer precios
	const { precios, traerPrecios } = useContext(PreciosContext);
	// state
	const initialState = filtraListaPrecio(precios, lista);
	const [filas, setFilas] = useState(initialState);

	// paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		setBuscador(true);
		setSelectListaPrecio(true);
		setSelectPuntoStock(false);
		traerPrecios();
	}, []);

	useEffect(() => {
		setFilas(filtraListaPrecio(precios, lista));
	}, [precios]);

	useEffect(() => {
		const filasLista = filtraListaPrecio(precios, lista);
		const filasBusqueda = filtrado(filasLista, busqueda);
		setFilas(filasBusqueda);
		setPage(0);
	}, [lista, busqueda]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{cortePagina.map((fila) => (
						<FilaPrecio key={fila.id} fila={fila} />
					))}
					{cortePagina.length === 0 ? bodyVacio(columnas) : filasVacias}
				</TableBody>
				<FooterTabla />
			</Table>
		</TableContainer>
	);
};

export default TablaPrecios;
