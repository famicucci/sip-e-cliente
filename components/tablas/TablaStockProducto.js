import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';
import HeadTabla from './HeadTabla';
import usePaginacion from '../../hooks/usePaginacion';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CallMadeIcon from '@material-ui/icons/CallMade';
import IconButton from '@material-ui/core/IconButton';
import BodyVacio from './BodyVacio';

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
	createData(
		'4',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		13
	),
	createData('5', 'VV000000094', 'CORREA Y COLLAR CHICA - AMARILLA - S', 13, 1),
	createData(
		'6',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		13
	),
	createData(
		'7',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		13
	),
	createData(
		'8',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		13
	),
	createData(
		'9',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		13
	),
	createData('10', 'VV000100054', 'CORREA Y COLLAR CHICA - AMARILLA - S', 13),
	createData(
		'11',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		13
	),
	createData(
		'12',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		13
	),
	createData(
		'13',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		13
	),
	createData(
		'14',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		13
	),
	createData('15', 'VV000000014', 'CORREA Y COLLAR CHICA - AMARILLA - S', 13),
	createData(
		'16',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		13
	),
	createData(
		'17',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		13
	),
	createData(
		'18',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		13
	),
	createData(
		'19',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		13
	),
	createData('20', 'VV000000053', 'CORREA Y COLLAR CHICA - AMARILLA - S', 13),
	createData(
		'21',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		13
	),
	createData(
		'22',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		13
	),
	createData(
		'23',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		13
	),
	createData(
		'24',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		13
	),
	createData('25', 'VV000000097', 'CORREA Y COLLAR CHICA - NARANJA - S', 13, 1),
	createData(
		'1',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
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
								<StyledTableRow>
									<TableCell component="th" scope="row">
										{fila.codigo}
									</TableCell>
									<TableCell align="left">{fila.descripcion}</TableCell>
									<TableCell align="center">{fila.cantidad}</TableCell>
									<TableCell align="center">
										<IconButton size="small">
											<CallMadeIcon />
										</IconButton>
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
