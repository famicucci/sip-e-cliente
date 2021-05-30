import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FilaElegirProducto from './FilaElegirProducto';

const columns = [
	{ id: 'producto', label: 'Producto', minWidth: 120 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50 },
	{ id: 'acciones', label: '', minWidth: 20 },
];

function createData(codigo, descripcion, precio, size) {
	return { codigo, descripcion, precio, size };
}

// traer de bd id producto, codigo, descripción, precio, lista precio, punto stock

const rows = [
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
	createData(
		'PJ100027LM',
		'Pantalon joggin - lineas horizontales - m - marrón',
		1850.0
	),
];

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
});

const TablaElegirProducto = () => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((fila) => (
								<FilaElegirProducto fila={fila} />
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default TablaElegirProducto;
