import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import usePaginacion from '../../hooks/usePaginacion';
import VentasContext from '../../context/ventas/ventasContext';
import FilaElegirProducto from '../tablas/componentes/FilaElegirProducto';
import { filtrado } from '../../functions/filtroTablas';

const columnas = [
	{ id: 'producto', label: 'Producto', minWidth: 80 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50 },
	{ id: 'acciones', label: '', minWidth: 20 },
];

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 483,
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
		busqueda,
		traerPreciosPtoStock,
		traerPreciosStockTotal,
		handleFilasPtoStock,
		handleFilasStockTotal,
		handleFilasSinStock,
	} = useContext(VentasContext);

	useEffect(() => {
		const filasPtoStock = async () => {
			await traerPreciosPtoStock();
			await handleFilasPtoStock();
		};
		filasPtoStock();
	}, []);

	useEffect(() => {
		if (valorRadio === 'pto-stock') {
			handleFilasPtoStock();
		}

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

		if (valorRadio === 'sin-stock' && preciosStockTotal.length === 0) {
			const filasSinStock = async () => {
				await traerPreciosStockTotal();
				await handleFilasSinStock();
			};
			filasSinStock();
		}

		if (valorRadio === 'sin-stock' && preciosStockTotal.length > 0) {
			handleFilasSinStock();
		}
	}, [valorRadio]);

	useEffect(() => {
		if (valorRadio === 'pto-stock') {
			handleFilasPtoStock();
		}

		if (valorRadio === 'total') {
			handleFilasStockTotal();
		}

		if (valorRadio === 'sin-stock') {
			handleFilasSinStock();
		}
		setPage(0);
	}, [ptoStock, listaPrecio]);

	useEffect(() => {
		setPage(0);
	}, [busqueda]);

	useEffect(() => {
		console.log('hola');
		if (valorRadio === 'pto-stock') {
			handleFilasPtoStock();
		}
	}, [preciosPtoStock]);

	const filasFiltradas = filtrado(filas, busqueda);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filasFiltradas, 5);

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columnas.map((column) => (
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
						{cortePagina.length === 0 ? bodyVacio(columnas) : filasVacias}
					</TableBody>
					<FooterTabla />
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default TablaElegirProducto;
