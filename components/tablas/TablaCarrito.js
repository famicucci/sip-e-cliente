import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FilaCarrito from '../tablas/componentes/FilaCarrito';

const columnas = [
	{ id: 'cantidad', label: 'Cant.', minWidth: 20 },
	{ id: 'producto', label: 'Producto', minWidth: 120 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50 },
	{ id: 'total', label: 'Total\u00a0($)', minWidth: 50, align: 'center' },
	{ id: 'acciones', label: '', minWidth: 20 },
];

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 380,
	},
});

const TablaElegirProducto = () => {
	const classes = useStyles();

	const carrito = [
		{
			codigo: 'PJ100022LM',
			descripcion: 'Pantalon joggin - lineas verticales - m - gris',
			pu: '1760.00',
			cantidad: 6,
			origen: [
				{
					alias: 'stock',
					ptoStockId: 1,
					ptoStockDescripcion: 'Showroom',
					cantidad: 2,
				},
				{
					alias: 'stock',
					ptoStockId: 2,
					ptoStockDescripcion: 'Depósito',
					cantidad: 3,
				},
				{
					alias: 'produccion',
					cantidad: 1,
				},
			],
		},
		{
			codigo: 'RA100031LM',
			descripcion: 'Remera algodón - basketball - s - negro',
			pu: '1320.00',
			cantidad: 3,
			origen: [
				{
					alias: 'stock',
					ptoStockId: 2,
					ptoStockDescripcion: 'Outlet',
					cantidad: 3,
				},
			],
		},
		{
			codigo: 'PJ100027LM',
			descripcion: 'Pantalon joggin - lineas horizontales - m - marrón',
			pu: '1850.00',
			cantidad: 3,
			origen: [
				{
					alias: 'stock',
					ptoStockId: 1,
					ptoStockDescripcion: 'Mercado Libre',
					cantidad: 3,
				},
			],
		},
	];

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columnas.map((columna) => (
								<TableCell
									key={columna.id}
									align={columna.align}
									style={{ minWidth: columna.minWidth }}
								>
									{columna.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{carrito.map((producto) => (
							<FilaCarrito producto={producto} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default TablaElegirProducto;
