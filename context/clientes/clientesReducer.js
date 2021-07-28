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
import { filBus } from '../../functions/filtros';

const ClientesReducer = (state, action) => {
	switch (action.type) {
		case TRAER_CLIENTES:
			let filas = filBus(action.payload.clientes, action.payload.bus);
			return {
				...state,
				clientes: action.payload.clientes,
				filas: filas,
				cargando: false,
			};
		case CREAR_CLIENTE:
			return {
				...state,
				clienteActivo: action.payload,
				mensajeStateClientes: { msg: 'Cliente creado', severity: 'success' },
			};

		case FILAS_CLIENTES:
			filas = filBus(state.clientes, action.payload);
			return {
				...state,
				filas: filas,
			};
		case FILA_ACTIVA_CLIENTE:
			let cliente = state.clientes.find((x) => x.id === action.payload);
			if (!cliente) cliente = {};

			return {
				...state,
				filaActiva: cliente,
			};

		case CAMPO_CLIENTE_ACTIVO:
			return {
				...state,
				clienteActivo: {
					...state.clienteActivo,
					[action.payload.attr]: action.payload.val,
				},
			};
		case LIMPIAR_CLIENTE_ACTIVO:
			return {
				...state,
				clienteActivo: { tipo: 'Minorista', condIva: 'Consumidor Final' },
			};
		case MODAL_INFORMACION_CLIENTE:
			return {
				...state,
				openModalInformacionCliente: action.payload,
			};
		case MODAL_NUEVO_CLIENTE:
			return {
				...state,
				openModalNuevoCliente: action.payload,
			};
		case OPEN_INFORMACION_CLIENTE:
			return {
				...state,
				clienteActivo: action.payload.obj,
				ordenesClienteActivo: action.payload.ordenes,
				facturasClienteActivo: action.payload.facturas,
				openInfoCliente: true,
			};
		case CLOSE_MODAL:
			return {
				...state,
				openInfoCliente: false,
			};
		case MOSTRAR_ERROR:
			return {
				...state,
				mensaje: action.payload,
			};

		default:
			return state;
	}
};

export default ClientesReducer;
