import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import BodyVacio from './BodyVacio';
import { BarraHerramientasContext } from '../../context/BarraHerramientasContext';

// Buscador
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import BodyTabla from './BodyTabla';

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
function createData(codigo, descripcion, precio) {
	return { codigo, descripcion, precio };
}

const rows = [
	createData(
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'VV000000094',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'VV000100054',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'VV000000014',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'VV000000053',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
	createData(
		'AL6V0210UNN',
		'ALMOHADONES DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		(2497).toFixed(2)
	),
	createData(
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		(3245).toFixed(2)
	),
	createData(
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		(4060).toFixed(2)
	),
	createData(
		'CO1G0804DRJ',
		'COLCHONETA PERRO MEDIANO - PERRITOS MIX - ROJO - M - GUATA',
		(3124).toFixed(2)
	),
	createData(
		'VV000000097',
		'CORREA Y COLLAR CHICA - NARANJA - S',
		(1300).toFixed(2)
	),
];

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
});

const TablaPrecios = () => {
	// estilos
	const classes = useStyles2();

	// setea barra de herramientas
	const { setBuscador } = useContext(BarraHerramientasContext);
	setBuscador(true);

	// buscador
	const [filas, setFilas] = useState(rows);
	const [busqueda, setBusqueda] = useState('');

	const onChange = (e) => {
		setBusqueda(e.target.value);
	};

	const filtrado = (filas, busqueda) => {
		const busquedaMayus = busqueda.toLowerCase();

		const rowsFiltradas = filas.filter(
			(row) =>
				Object.values(row).join().toLowerCase().indexOf(busquedaMayus) !== -1
		);

		setFilas(rowsFiltradas);
	};

	useEffect(() => {
		filtrado(rows, busqueda);
	}, [busqueda]);

	return (
		<>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Buscar…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
					value={busqueda}
					onChange={onChange}
				/>
			</div>
			<TableContainer component={Paper}>
				<Table className={classes.table}>
					{rows.length !== 0 ? (
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
		</>
	);
};

export default TablaPrecios;
