import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import FilaListaProductos from './FilaListaProductos';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 400 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{
		id: 4,
		nombre: 'Origen',
		align: 'center',
		minWidth: 60,
		boton: true,
		contenidoBoton: <HomeWorkIcon />,
	},
];

const TablaListaProductos = ({ productos }) => {
	const classes = useStyles();

	// extraer los id de las columnas
	const colIndex = columnas.reduce(
		(acc, el) => ({ ...acc, [el.nombre]: el }),
		{}
	);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{productos.map((x) => (
						<FilaListaProductos fila={x} colIndex={colIndex} />
					))}
					{/* {productos.length === 0 ? bodyVacio(columnas) : filasVacias} */}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaListaProductos;
