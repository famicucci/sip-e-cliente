import React, { useReducer } from 'react';
import ClientesContext from './clientesContext';
import ClientesReducer from './clientesReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_CLIENTES,
	FILAS_CLIENTES,
	CAMPO_CLIENTE_ACTIVO,
	LIMPIAR_CLIENTE_ACTIVO,
	OPEN_INFORMACION_CLIENTE,
	CLOSE_MODAL,
	MOSTRAR_ERROR,
} from '../../types';

const ClienteState = (props) => {
	const clienteInicial = {
		nombre: '',
		apellido: '',
		razonSocial: '',
		email: '',
		celular: '',
		instagram: '',
		facebook: '',
		calle: '',
		numero: '',
		piso: '',
		depto: '',
		barrio: '',
		codPostal: '',
		ciudad: '',
		provincia: '',
		observaciones: '',
		mascota: '',
		tipo: 'Minorista',
		referencia: '',
		condIva: 'Consumidor Final',
	};
	const initialState = {
		clientes: [],
		filas: [],
		clienteActivo: { tipo: 'Minorista', condIva: 'Consumidor Final' },
		openInfoCliente: false,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(ClientesReducer, initialState);

	const traerClientes = async (bus) => {
		try {
			const r = await clienteAxios.get('/api/clientes/');

			dispatch({
				type: TRAER_CLIENTES,
				payload: { clientes: r.data, bus: bus },
			});
		} catch (error) {
			dispatch({
				type: MOSTRAR_ERROR,
				payload: { msg: 'Hubo un error', categoria: 'error' },
			});
		}
	};

	// las funciones
	const crearCliente = async (clien) => {
		// enviar a la base de datos
		// try {
		// 	const r = await clienteAxios.get('/api/precios');
		// 	dispatch({
		// 		type: TRAER_PRECIOS,
		// 		payload: { arrayProd: r.data, bus: bus },
		// 	});
		// } catch (error) {
		// 	dispatch({
		// 		type: ERROR_PRECIOS,
		// 		payload: error,
		// 	});
		// }
	};

	const handleClienteActivo = (attr, val) => {
		dispatch({
			type: CAMPO_CLIENTE_ACTIVO,
			payload: { attr, val },
		});
	};

	const limpiarCliente = () => {
		dispatch({
			type: LIMPIAR_CLIENTE_ACTIVO,
		});
	};

	const handleFilas = (bus) => {
		dispatch({
			type: FILAS_CLIENTES,
			payload: bus,
		});
	};

	const handleOpeninfoCliente = (obj) => {
		console.log(obj);
		dispatch({
			type: OPEN_INFORMACION_CLIENTE,
			payload: obj,
		});
	};

	const handleClose = () => {
		dispatch({
			type: CLOSE_MODAL,
		});
	};

	return (
		<ClientesContext.Provider
			value={{
				clientes: state.clientes,
				filas: state.filas,
				openInfoCliente: state.openInfoCliente,
				clienteActivo: state.clienteActivo,
				cargando: state.cargando,
				traerClientes,
				handleClienteActivo,
				limpiarCliente,
				handleFilas,
				handleOpeninfoCliente,
				handleClose,
			}}
		>
			{props.children}
		</ClientesContext.Provider>
	);
};

export default ClienteState;
