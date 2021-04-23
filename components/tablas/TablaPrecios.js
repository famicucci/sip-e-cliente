import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from '../../components/layouts/Paginacion';
import TableHead from '@material-ui/core/TableHead';

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

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

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
		'VV000000054',
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
		'VV000000054',
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
		'VV000000054',
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
		'VV000000054',
		'CORREA Y COLLAR CHICA - AMARILLA - S',
		(1300).toFixed(2)
	),
];

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
});

const TablaPrecios = () => {
	const classes = useStyles2();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<StyledTableCell>Código</StyledTableCell>
						<StyledTableCell align="left">Descripción</StyledTableCell>
						<StyledTableCell align="center">Precio&nbsp;($)</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
					).map((row) => (
						<StyledTableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.codigo}
							</TableCell>
							<TableCell align="left">{row.descripcion}</TableCell>
							<TableCell align="right">{row.precio}</TableCell>
						</StyledTableRow>
					))}

					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
							colSpan={3}
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							labelRowsPerPage="Filas por página:"
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

export default TablaPrecios;
