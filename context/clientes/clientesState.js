import React, { useReducer } from 'react';
import ClientesContext from './clientesContext';
import ClientesReducer from './clientesReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_CLIENTES,
	FILAS_CLIENTES,
	FILA_ACTIVA_CLIENTE,
	CLIENTE_ACTIVO,
	LIMPIAR_CLIENTE_ACTIVO,
	MODAL_INFORMACION_CLIENTE,
	MODAL_NUEVO_CLIENTE,
	OPEN_INFORMACION_CLIENTE,
	CLOSE_MODAL,
	MOSTRAR_ALERTA_CLIENTES,
	OCULTAR_ALERTA_CLIENTES,
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
		mensaje: null,
		mensajeClientes: null,
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
			mostrarAlertaClientes('Hubo un error', 'error');
		}
	};

	// las funciones
	const crearCliente = async (cliente) => {
		try {
			const r = await clienteAxios.post('/api/clientesssss', cliente);

			mostrarAlertaClientes('Cliente creado', 'success');
		} catch (error) {
			mostrarAlertaClientes('Hubo un error', 'error');
		}
	};

	const handleFilaActiva = (idCliente) => {
		dispatch({
			type: FILA_ACTIVA_CLIENTE,
			payload: idCliente,
		});
	};

	const handleClienteActivo = (cliente) => {
		dispatch({
			type: CLIENTE_ACTIVO,
			payload: cliente,
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
			mostrarAlertaClientes('Hubo un error', 'error');
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

	const mostrarAlertaClientes = (msg, severity) => {
		dispatch({
			type: MOSTRAR_ALERTA_CLIENTES,
			payload: { msg, severity },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_CLIENTES,
			});
		}, 4000);
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
				mensaje: state.mensaje,
				mensajeClientes: state.mensajeClientes,
				cargando: state.cargando,
				crearCliente,
				traerClientes,
				handleClienteActivo,
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
