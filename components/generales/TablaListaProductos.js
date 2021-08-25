import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import FilaListaProductos from './FilaListaProductos';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const TablaListaProductos = ({ productos, columnas }) => {
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
					{productos.map((x, i) => (
						<FilaListaProductos key={i} fila={x} colIndex={colIndex} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaListaProductos;
