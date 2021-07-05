import React, { useContext, useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/IrLogin';
import SpinnerPantalla from '../components/SpinnerPantalla';
import TablaClientes from '../components/cliente/TablaClientes';
import RoomIcon from '@material-ui/icons/Room';
import CallMadeIcon from '@material-ui/icons/CallMade';

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Nombre y Apellido', align: 'left', minWidth: 230 },
	{ id: 2, nombre: 'Email', align: 'left', minWidth: 240 },
	{ id: 7, nombre: 'Celular', align: 'left', minWidth: 125 },
	{ id: 3, nombre: 'Razon Social', align: 'left', minWidth: 200 },
	{ id: 4, nombre: 'Observaciones', align: 'left', minWidth: 150 },
	{ id: 5, nombre: 'Cond. IVA', align: 'left', minWidth: 180 },
	{ id: 6, nombre: 'Creación', align: 'center', minWidth: 110 },
	{ id: 8, nombre: 'Tipo', align: 'center', minWidth: 100 },
	{
		id: 9,
		nombre: 'Direcciones',
		align: 'left',
		minWidth: 60,
		boton: true,
		contenidoBoton: <RoomIcon />,
		funcBoton: null,
	},
	{
		id: 10,
		nombre: 'Ver Más',
		align: 'left',
		minWidth: 60,
		boton: true,
		contenidoBoton: <CallMadeIcon />,
		funcBoton: null,
	},
];

const Clientes = () => {
	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	if (!autenticado && cargando) {
		return <SpinnerPantalla />;
	}

	if (!autenticado && !cargando) {
		return <IrLogin />;
	}

	return (
		<Layout>
			<TablaClientes columnas={columnas} />
		</Layout>
	);
};

export default Clientes;
