import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../generales/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaCliente from './FilaCliente';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import SpinnerTabla from '../../components/SpinnerTabla';
import ClientesContext from '../../context/clientes/clientesContext';
import FacsOrdsCliente from '../cliente/FacsOrdsCliente';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const TablaClientes = ({ columnas }) => {
	const classes = useStyles();

	const { busquedaCliente } = useContext(BarraHerramientasContext);
	const { filas, cargando, traerClientes, handleFilas } =
		useContext(ClientesContext);

	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 5);

	useEffect(() => {
		traerClientes(busquedaCliente);
	}, []);

	useEffect(() => {
		setPage(0);
		handleFilas(busquedaCliente);
	}, [busquedaCliente]);

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
							<FilaCliente key={x.id} fila={x} colIndex={colIndex} />
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
			<FacsOrdsCliente />
		</TableContainer>
	);
};

export default TablaClientes;
