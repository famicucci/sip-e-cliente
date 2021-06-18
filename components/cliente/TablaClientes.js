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
import PreciosContext from '../../context/precios/preciosContext';
import SpinnerTabla from '../../components/SpinnerTabla';

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

const createFila = (
	nombre,
	apellido,
	razonSocial,
	email,
	celular,
	instagram,
	facebook,
	calle,
	numero,
	piso,
	depto,
	barrio,
	codPostal,
	ciudad,
	provincia,
	observaciones,
	mascota,
	tipo,
	referencia,
	condIva
) => {
	return {
		nombre,
		apellido,
		razonSocial,
		email,
		celular,
		instagram,
		facebook,
		calle,
		numero,
		piso,
		depto,
		barrio,
		codPostal,
		ciudad,
		provincia,
		observaciones,
		mascota,
		tipo,
		referencia,
		condIva,
	};
};

const filas = [
	createFila(
		'nombre',
		'apellido',
		'razonSocial',
		'famicucci@gmail.com',
		'celular',
		'instagram',
		'facebook',
		'calle',
		'numero',
		'piso',
		'depto',
		'barrio',
		'codPostal',
		'ciudad',
		'provincia',
		'observaciones',
		'mascota',
		'tipo',
		'referencia',
		'condIva'
	),
	createFila(
		'nombre',
		'apellido',
		'razonSocial',
		'jy.juarez@gmail.com',
		'celular',
		'instagram',
		'facebook',
		'calle',
		'numero',
		'piso',
		'depto',
		'barrio',
		'codPostal',
		'ciudad',
		'provincia',
		'observaciones',
		'mascota',
		'tipo',
		'referencia',
		'condIva'
	),
	createFila(
		'nombre',
		'apellido',
		'razonSocial',
		'email',
		'celular',
		'instagram',
		'facebook',
		'calle',
		'numero',
		'piso',
		'depto',
		'barrio',
		'codPostal',
		'ciudad',
		'provincia',
		'observaciones',
		'mascota',
		'tipo',
		'referencia',
		'condIva'
	),
	createFila(
		'nombre',
		'apellido',
		'razonSocial',
		'email',
		'celular',
		'instagram',
		'facebook',
		'calle',
		'numero',
		'piso',
		'depto',
		'barrio',
		'codPostal',
		'ciudad',
		'provincia',
		'observaciones',
		'mascota',
		'tipo',
		'referencia',
		'condIva'
	),
	createFila(
		'nombre',
		'apellido',
		'razonSocial',
		'email',
		'celular',
		'instagram',
		'facebook',
		'calle',
		'numero',
		'piso',
		'depto',
		'barrio',
		'codPostal',
		'ciudad',
		'provincia',
		'observaciones',
		'mascota',
		'tipo',
		'referencia',
		'condIva'
	),
	createFila(
		'nombre',
		'apellido',
		'razonSocial',
		'email',
		'celular',
		'instagram',
		'facebook',
		'calle',
		'numero',
		'piso',
		'depto',
		'barrio',
		'codPostal',
		'ciudad',
		'provincia',
		'observaciones',
		'mascota',
		'tipo',
		'referencia',
		'condIva'
	),
];

const TablaClientes = () => {
	const classes = useStyles();

	// // context herramientas
	// const { busqueda, handleHerramientasPrecios } = useContext(
	// 	BarraHerramientasContext
	// );

	// // context precios
	// const { filas, lista, traerPrecios, handleFilas, cargando } =
	// 	useContext(PreciosContext);

	// hook paginación
	const [FooterTabla, filasVacias, cortePagina, setPage, bodyVacio] =
		usePaginacion(filas, 5);

	// useEffect(() => {
	// 	handleHerramientasPrecios();
	// 	traerPrecios(busqueda);
	// }, []);

	// useEffect(() => {
	// 	setPage(0);
	// 	handleFilas(busqueda);
	// }, [busqueda, lista]);

	const cargando = false;
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<HeadTabla columnas={columnas} />
				<TableBody>
					{!cargando ? (
						cortePagina.map((x) => <FilaCliente key={x.id} fila={x} />)
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
