import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';
import HeadTabla from './componentes/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import FilaStockProducto from './componentes/FilaStockProducto';
import ModalStockProducto from '../modales/ModalStockProducto';

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

// datos de la tabla
function createData(id, codigo, descripcion, cantidad) {
	return { id, codigo, descripcion, cantidad };
}
const rows = [
	createData(
		'1',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		13
	),
	createData(
		'2',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		13
	),
	createData(
		'3',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		13
	),
];

const TablaStock = () => {
	const classes = useStyles();

	const [filas, setFilas] = useState(rows);

	const [
		FooterTabla,
		filasVacias,
		cortePagina,
		setPage,
		bodyVacio,
	] = usePaginacion(filas);

	const {
		busqueda,
		setBuscador,
		filtrado,
		setSelectListaPrecio,
		setSelectPuntoStock,
	} = useContext(BarraHerramientasContext);

	useEffect(() => {
		setBuscador(true);
		setSelectListaPrecio(false);
		setSelectPuntoStock(false);
	}, []);

	useEffect(() => {
		setPage(0);
		const nuevasFilas = filtrado(rows, busqueda);
		setFilas(nuevasFilas);
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
