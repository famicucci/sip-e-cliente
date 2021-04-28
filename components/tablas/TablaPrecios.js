import React, { useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import BodyVacio from './BodyVacio';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';
import BodyTabla from './BodyTabla';

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
});

// para encabezado
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

// datos de la tabla
function createData(id, codigo, descripcion, precio) {
	return { id, codigo, descripcion, precio };
}

const rows = [
	createData(
		'1',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'2',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'3',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'4',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'5',
		'VV000000094',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'6',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'7',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'8',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'9',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'10',
		'VV000100054',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'11',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'12',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'13',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'14',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'15',
		'VV000000014',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'16',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'17',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'18',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'19',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'20',
		'VV000000053',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'21',
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'22',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'23',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'24',
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'25',
		'VV000000097',
		'CORREA Y COLLAR CHICA - NARANJA - S',
		(1300).toFixed(2)
	),
];

const TablaPrecios = () => {
	// estilos
	const classes = useStyles2();

	// setea barra de herramientas
	const { busqueda, filas, setBuscador, filtrado } = useContext(
		BarraHerramientasContext
	);

	setBuscador(true);

	useEffect(() => {
		// la busqueda inicia en el array inicial
		filtrado(rows, busqueda);
	}, [busqueda]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				{filas.length !== 0 ? (
					<>
						<TableHead>
							<TableRow>
								<StyledTableCell>Código</StyledTableCell>
								<StyledTableCell align="left">Descripción</StyledTableCell>
								<StyledTableCell align="center">
									Precio&nbsp;($)
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<BodyTabla filas={filas} />
					</>
				) : (
					<BodyVacio />
				)}
			</Table>
		</TableContainer>
	);
};

export default TablaPrecios;
