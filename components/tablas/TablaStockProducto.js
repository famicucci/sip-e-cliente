import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';
import HeadTabla from './componentes/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import BodyVacio from './componentes/BodyVacio';
import FilaStockProducto from './componentes/FilaStockProducto';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código' },
	{ id: 2, nombre: 'Descripción' },
	{ id: 3, nombre: 'Cantidad' },
	{ id: 4, nombre: '' },
];

const cantColumnas = columnas.length;

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

	const [FooterTabla, filasVacias, cortePagina, setPage] = usePaginacion(filas);

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
				{cortePagina.length !== 0 ? (
					<>
						<TableBody>
							{cortePagina.map((fila) => (
								<FilaStockProducto key={fila.id} fila={fila} />
							))}
							{filasVacias}
						</TableBody>
						<FooterTabla />
					</>
				) : (
					<BodyVacio cantColumnas={cantColumnas} />
				)}
			</Table>
		</TableContainer>
	);
};

export default TablaStock;
