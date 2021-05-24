import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from './componentes/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaPrecio from '../tablas/componentes/FilaPrecio';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import PreciosContext from '../../context/precios/preciosContext';

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

	// context herramientas
	const { busqueda, handleHerramientasPrecios } = useContext(
		BarraHerramientasContext
	);

	// context precios
	const {
		precios,
		filas,
		lista,
		traerPrecios,
		handleFilasLista,
		handleFilasBusqueda,
	} = useContext(PreciosContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		handleHerramientasPrecios();
		traerPrecios();
	}, []);

	useEffect(() => {
		handleFilasLista(precios, lista);
		if (busqueda !== '') {
			handleFilasBusqueda(precios, lista, busqueda);
		}
	}, [precios]);

	useEffect(() => {
		handleFilasLista(precios, lista);
		handleFilasBusqueda(precios, lista, busqueda);
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
