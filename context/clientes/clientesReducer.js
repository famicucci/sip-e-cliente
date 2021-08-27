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
	AGREGAR_CLIENTE,
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

		case CLIENTE_ACTIVO:
			return {
				...state,
				clienteActivo: action.payload,
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
		case MOSTRAR_ALERTA_CLIENTES:
			return {
				...state,
				mensajeClientes: action.payload,
			};
		case OCULTAR_ALERTA_CLIENTES:
			return {
				...state,
				mensajeClientes: null,
			};
		case AGREGAR_CLIENTE:
			return {
				...state,
				clientes: [...state.clientes, action.payload],
			};
		default:
			return state;
	}
};

export default ClientesReducer;
