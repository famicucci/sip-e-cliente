import React, { useReducer } from 'react';
import ClientesContext from './clientesContext';
import ClientesReducer from './clientesReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_CLIENTES,
	CREAR_CLIENTE,
	FILAS_CLIENTES,
	FILA_ACTIVA_CLIENTE,
	CAMPO_CLIENTE_ACTIVO,
	LIMPIAR_CLIENTE_ACTIVO,
	MODAL_INFORMACION_CLIENTE,
	MODAL_NUEVO_CLIENTE,
	OPEN_INFORMACION_CLIENTE,
	CLOSE_MODAL,
	MOSTRAR_ERROR,
} from '../../types';

const ClienteState = (props) => {
	const initialState = {
		clientes: [],
		filas: [],
		filaActiva: {},
		clienteActivo: null,
		ordenesClienteActivo: null,
		facturasClienteActivo: null,
		openModalInformacionCliente: false,
		openModalNuevoCliente: false,
		openInfoCliente: false,
		mensajeStateClientes: null,
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
	const crearCliente = async (cliente) => {
		try {
			const r = await clienteAxios.post('/api/clientes', cliente);
			dispatch({
				type: CREAR_CLIENTE,
				payload: r.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_PRECIOS,
				payload: error,
			});
		}
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

	const handleOpenModalNuevoCliente = (bool) => {
		dispatch({
			type: MODAL_NUEVO_CLIENTE,
			payload: bool,
		});
	};

	return (
		<ClientesContext.Provider
			value={{
				clientes: state.clientes,
				filas: state.filas,
				openModalInformacionCliente: state.openModalInformacionCliente,
				openModalNuevoCliente: state.openModalNuevoCliente,
				openInfoCliente: state.openInfoCliente,
				filaActiva: state.filaActiva,
				clienteActivo: state.clienteActivo,
				ordenesClienteActivo: state.ordenesClienteActivo,
				facturasClienteActivo: state.facturasClienteActivo,
				mensajeStateClientes: state.mensajeStateClientes,
				cargando: state.cargando,
				crearCliente,
				traerClientes,
				handleClienteActivo,
				limpiarCliente,
				handleFilas,
				handleFilaActiva,
				handleOpenModalInformacionCliente,
				handleOpenModalNuevoCliente,
				handleOpenFacsOrdsCliente,
				handleClose,
			}}
		>
			{props.children}
		</ClientesContext.Provider>
	);
};

export default ClienteState;
