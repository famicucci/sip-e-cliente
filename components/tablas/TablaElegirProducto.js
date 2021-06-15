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
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const columnas = [
	{ id: 'producto', label: 'Producto', minWidth: 80 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50 },
	{ id: 'acciones', label: '', minWidth: 20 },
];

const useStyles = makeStyles({
	tableContainer: {
		flex: 1,
		minHeight: 0,
	},
});

const TablaElegirProducto = () => {
	const classes = useStyles();

	const { busqueda } = useContext(BarraHerramientasContext);

	const {
		preciosPtoStock,
		filas,
		ptoStock,
		listaPrecio,
		valorRadio,
		traerProductos,
		handleFilas,
	} = useContext(VentasContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 5);

	useEffect(() => {
		traerProductos(busqueda);
	}, []);

	useEffect(() => {
		handleFilas(busqueda);
	}, [valorRadio, busqueda, ptoStock, listaPrecio, preciosPtoStock]);

	return (
		<TableContainer className={classes.tableContainer} component={Paper}>
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
					{filas.map((fila) => (
						<FilaElegirProducto fila={fila} />
					))}
					{filas.length === 0
						? bodyVacio(columnas, 'Ningún producto coincide...')
						: filasVacias}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaElegirProducto;
