import React, { useContext, useEffect, useState } from 'react';
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
	root: {
		width: '100%',
		height: '100%',
	},
});

const TablaElegirProducto = () => {
	const classes = useStyles();

	const { busqueda } = useContext(BarraHerramientasContext);
	const [height, setHeight] = useState('67vh');

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
		const elemento = document.getElementById('contenedor-tabla');
		const alturaTabla = elemento.clientHeight;
		setHeight(alturaTabla);
	}, [height]);

	useEffect(() => {
		handleFilas(busqueda);
	}, [valorRadio, busqueda, ptoStock, listaPrecio, preciosPtoStock]);

	return (
		<Paper id="contenedor-tabla" className={classes.root}>
			<TableContainer style={{ maxHeight: height }}>
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
		</Paper>
	);
};

export default TablaElegirProducto;
