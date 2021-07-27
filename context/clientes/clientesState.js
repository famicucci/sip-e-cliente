import React, { useReducer } from 'react';
import ClientesContext from './clientesContext';
import ClientesReducer from './clientesReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_CLIENTES,
	FILAS_CLIENTES,
	FILA_ACTIVA_CLIENTE,
	CAMPO_CLIENTE_ACTIVO,
	LIMPIAR_CLIENTE_ACTIVO,
	MODAL_INFORMACION_CLIENTE,
	OPEN_INFORMACION_CLIENTE,
	CLOSE_MODAL,
	MOSTRAR_ERROR,
} from '../../types';

const ClienteState = (props) => {
	const initialState = {
		clientes: [],
		filas: [],
		filaActiva: {},
		clienteActivo: { tipo: 'Minorista', condIva: 'Consumidor Final' },
		ordenesClienteActivo: null,
		facturasClienteActivo: null,
		openModalInformacionCliente: false,
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

	const handleFilaActiva = (idCliente) => {
		dispatch({
			type: FILA_ACTIVA_CLIENTE,
			payload: idCliente,
		});
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

	const handleOpenFacsOrdsCliente = async (obj) => {
		// funcion que traiga las ordenes de un cliente
		try {
			const ordenes = await clienteAxios.get(`/api/ordenes/cliente/${obj.id}`);
			const facturas = await clienteAxios.get(
				`/api/facturas/cliente/${obj.id}`
			);

			dispatch({
				type: OPEN_INFORMACION_CLIENTE,
				payload: { obj: obj, ordenes: ordenes.data, facturas: facturas.data },
			});
		} catch (error) {
			dispatch({
				type: MOSTRAR_ERROR,
				payload: { msg: 'Hubo un error', categoria: 'error' },
			});
		}

		// funcion que traiga las facturas de un cliente
	};

	const handleClose = () => {
		dispatch({
			type: CLOSE_MODAL,
		});
	};

	const handleOpenModalInformacionCliente = (bool) => {
		dispatch({
			type: MODAL_INFORMACION_CLIENTE,
			payload: bool,
		});
	};

	return (
		<ClientesContext.Provider
			value={{
				clientes: state.clientes,
				filas: state.filas,
				openModalInformacionCliente: state.openModalInformacionCliente,
				openInfoCliente: state.openInfoCliente,
				filaActiva: state.filaActiva,
				clienteActivo: state.clienteActivo,
				ordenesClienteActivo: state.ordenesClienteActivo,
				facturasClienteActivo: state.facturasClienteActivo,
				cargando: state.cargando,
				traerClientes,
				handleClienteActivo,
				limpiarCliente,
				handleFilas,
				handleFilaActiva,
				handleOpenModalInformacionCliente,
				handleOpenFacsOrdsCliente,
				handleClose,
			}}
		>
			{props.children}
		</ClientesContext.Provider>
	);
};

export default ClienteState;
