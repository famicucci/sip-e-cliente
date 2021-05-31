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
		preciosStockTotal,
		filas,
		ptoStock,
		listaPrecio,
		valorRadio,
		traerPreciosPtoStock,
		traerPreciosStockTotal,
		handleFilasPtoStock,
		handleFilasStockTotal,
	} = useContext(VentasContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas);

	useEffect(() => {
		const filasPtoStock = async () => {
			await traerPreciosPtoStock();
			await handleFilasPtoStock();
		};
		filasPtoStock();
	}, []);

	useEffect(() => {
		if (valorRadio === 'total' && preciosStockTotal.length === 0) {
			const filasStockTotal = async () => {
				await traerPreciosStockTotal();
				await handleFilasStockTotal();
			};
			filasStockTotal();
		}

		if (valorRadio === 'total' && preciosStockTotal.length > 0) {
			handleFilasStockTotal();
		}

		if (valorRadio === 'pto-stock') {
			handleFilasPtoStock();
		}
	}, [valorRadio]);

	useEffect(() => {
		if (valorRadio === 'pto-stock') {
			handleFilasPtoStock();
		}

		if (valorRadio === 'total') {
			handleFilasStockTotal();
		}
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
