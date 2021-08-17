import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FilaCarrito from '../venta/FilaCarrito';
import FilaCarrEnvio from '../venta/FilaCarrEnvio';
import VentasContext from '../../context/ventas/ventasContext';
import BodyVacio from '../BodyVacio';

const columnas = [
	{ id: 'cantidad', label: 'Cant.', minWidth: 20, align: 'center' },
	{ id: 'producto', label: 'Producto', minWidth: 100 },
	{ id: 'precio', label: 'Precio\u00a0($)', minWidth: 50 },
	{ id: 'total', label: 'Total\u00a0($)', minWidth: 50, align: 'center' },
	{ id: 'acciones', label: '', minWidth: 20 },
];

const useStyles = makeStyles({
	tableContainer: {
		flex: 1,
		minHeight: 0,
	},
});

const TablaCarrito = () => {
	const classes = useStyles();

	const { carrito } = useContext(VentasContext);

	return (
		<TableContainer className={classes.tableContainer} component={Paper}>
			<Table aria-label="sticky table">
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
					{carrito.length !== 0 ? (
						<>
							{/* {carrito.map((producto) => (
								<FilaCarrito producto={producto} />
							))}
							<FilaCarrEnvio /> */}
						</>
					) : (
						<BodyVacio
							content="Todavía no cargaste productos"
							columnas={columnas}
						/>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaCarrito;
