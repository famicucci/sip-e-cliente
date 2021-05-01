import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';
import HeadTabla from './componentes/HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BodyVacio from './componentes/BodyVacio';
import ValorCantidad from './componentes/ValorCantidadEditable';
import BotonCantidadEditable from './componentes/BotonCantidadEditable';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', alineacion: 'left' },
	{ id: 2, nombre: 'Descripción', alineacion: 'left' },
	{ id: 3, nombre: 'Cantidad', alineacion: 'center' },
	{ id: 4, nombre: '', alineacion: 'left' },
];

const cantColumnas = columnas.length;

// datos de la tabla
function createData(id, codigo, descripcion, cantidad, idPuntoStock) {
	return { id, codigo, descripcion, cantidad, idPuntoStock };
}
const rows = [
	createData(
		'1',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		13,
		1
	),
	createData(
		'2',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		13,
		1
	),
	createData(
		'3',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		13,
		1
	),
	createData(
		'4',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		21,
		2
	),
	createData(
		'5',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		21,
		2
	),
	createData(
		'6',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		21,
		2
	),
	createData(
		'7',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		34,
		3
	),
	createData(
		'8',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		34,
		3
	),
	createData(
		'9',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		34,
		3
	),
	createData(
		'10',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		45,
		6
	),
	createData(
		'11',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		45,
		6
	),
	createData(
		'12',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		45,
		6
	),
];

const TablaStock = () => {
	const classes = useStyles();

	const [filasPuntoStock, setFilasPuntoStock] = useState(rows);
	const [filas, setFilas] = useState(filasPuntoStock);

	const [FooterTabla, filasVacias, cortePagina, setPage] = usePaginacion(filas);

	const {
		busqueda,
		setBuscador,
		puntoStock,
		filtrado,
		filtraPuntoStock,
		setSelectListaPrecio,
		setSelectPuntoStock,
	} = useContext(BarraHerramientasContext);

	useEffect(() => {
		setBuscador(true);
		setSelectListaPrecio(false);
		setSelectPuntoStock(true);
	}, []);

	useEffect(() => {
		if (busqueda !== '') {
			const nuevasFilas = filtrado(filasPuntoStock, busqueda);
			setFilas(nuevasFilas);
		} else {
			setFilas(filasPuntoStock);
		}
	}, [filasPuntoStock]);

	useEffect(() => {
		setPage(0);
		const nuevasFilas = filtraPuntoStock(rows, puntoStock);
		setFilasPuntoStock(nuevasFilas);
	}, [puntoStock]);

	useEffect(() => {
		setPage(0);
		const nuevasFilas = filtrado(filasPuntoStock, busqueda);
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
								<StyledTableRow key={fila.id}>
									<TableCell component="th" scope="row">
										{fila.codigo}
									</TableCell>
									<TableCell align="left">{fila.descripcion}</TableCell>
									<TableCell align="center">
										<ValorCantidad fila={fila} />
									</TableCell>
									<TableCell align="center">
										<BotonCantidadEditable fila={fila} />
									</TableCell>
								</StyledTableRow>
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
