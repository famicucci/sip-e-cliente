import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import HeadTabla from '../tablas/componentes/HeadTabla';
import TableBody from '@material-ui/core/TableBody';
import usePaginacion from '../../hooks/usePaginacion';
import FilaCliente from './FilaCliente';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import SpinnerTabla from '../../components/SpinnerTabla';
import ClientesContext from '../../context/clientes/clientesContext';
import BotonEditar from '../tablas/componentes/BotonFilaTabla';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Nombre y Apellido', align: 'left', minWidth: 300 },
	{ id: 2, nombre: 'Email', align: 'left', minWidth: 240 },
	{ id: 2, nombre: '', align: 'center', minWidth: 60 },
];

const TablaClientes = ({ contenidoBoton, funcBoton }) => {
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

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{!cargando ? (
						cortePagina.map((x) => (
							<FilaCliente
								key={x.id}
								fila={x}
								boton={
									<BotonEditar
										contenido={contenidoBoton}
										onClick={() => {
											funcBoton(x);
										}}
									/>
								}
							/>
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

export default TablaClientes;
