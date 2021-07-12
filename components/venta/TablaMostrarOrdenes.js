import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaMostrarOrdenes from './FilaMostrarOrdenes';
import SpinnerTabla from '../../components/SpinnerTabla';

const useStyles = makeStyles({
	table: {
		minWidth: 750,
	},
});

const TablaMostrarOrdenes = ({ columnas, filas, cargando }) => {
	const classes = useStyles();

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 5);

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
					{!cargando ? (
						cortePagina.map((x) => (
							<FilaMostrarOrdenes key={x.id} fila={x} colIndex={colIndex} />
						))
					) : (
						<SpinnerTabla cantColumnas={3} />
					)}
					{cortePagina.length === 0 && !cargando
						? bodyVacio(columnas)
						: filasVacias}
				</TableBody>
				{!cargando ? <FooterTabla /> : null}
			</Table>
		</TableContainer>
	);
};

export default TablaMostrarOrdenes;
