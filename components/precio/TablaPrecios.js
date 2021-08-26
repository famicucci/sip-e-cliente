import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaPrecio from './FilaPrecio';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import PreciosContext from '../../context/precios/preciosContext';
import SpinnerTabla from '../generales/SpinnerTabla';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 480 },
	{ id: 3, nombre: 'Precio\xa0($)', align: 'center', minWidth: 100 },
];

const TablaPrecios = () => {
	const classes = useStyles();

	// context herramientas
	const { busqueda, handleHerramientasPrecios } = useContext(
		BarraHerramientasContext
	);

	// context precios
	const { filas, lista, traerPrecios, handleFilas, cargando } =
		useContext(PreciosContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		handleHerramientasPrecios();
		traerPrecios(busqueda);
	}, []);

	useEffect(() => {
		setPage(0);
		handleFilas(busqueda);
	}, [busqueda, lista]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{!cargando ? (
						cortePagina.map((fila) => <FilaPrecio key={fila.id} fila={fila} />)
					) : (
						<SpinnerTabla cantColumnas={3} />
					)}
					{cortePagina.length === 0 && !cargando
						? bodyVacio(columnas)
						: filasVacias}
				</TableBody>
				{!cargando ? <FooterTabla /> : null}
			</Table>
		</TableContainer>
	);
};

export default TablaPrecios;
