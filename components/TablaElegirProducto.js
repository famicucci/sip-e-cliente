import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FilaElegirProducto from './FilaElegirProducto';
import usePaginacion from '../hooks/usePaginacion';
import VentasContext from '../context/ventas/ventasContext';

const columns = [
	{ id: 'producto', label: 'Producto', minWidth: 120 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50 },
	{ id: 'acciones', label: '', minWidth: 20 },
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

	const {
		preciosPtoStock,
		filas,
		ptoStock,
		listaPrecio,
		traerPreciosPtoStock,
		handleFilasPtoStock,
	} = useContext(VentasContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		traerPreciosPtoStock();
	}, []);

	useEffect(() => {
		handleFilasPtoStock();
	}, [preciosPtoStock]);

	useEffect(() => {
		handleFilasPtoStock();
	}, [ptoStock, listaPrecio]);

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
						{cortePagina.map((fila) => (
							<FilaElegirProducto fila={fila} />
						))}
					</TableBody>
					<FooterTabla />
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default TablaElegirProducto;
