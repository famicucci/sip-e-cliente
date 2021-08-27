import {
	TRAER_CLIENTES,
	FILA_ACTIVA_CLIENTE,
	MODAL_INFORMACION_CLIENTE,
	MODAL_NUEVO_CLIENTE,
	OPEN_INFORMACION_CLIENTE,
	CLOSE_MODAL,
	MOSTRAR_ALERTA_CLIENTES,
	OCULTAR_ALERTA_CLIENTES,
	AGREGAR_CLIENTE,
} from '../../types';

const ClientesReducer = (state, action) => {
	switch (action.type) {
		case TRAER_CLIENTES:
			return {
				...state,
				clientes: action.payload,
				cargando: false,
			};
		case FILA_ACTIVA_CLIENTE:
			let cliente = state.clientes.find((x) => x.id === action.payload);
			if (!cliente) cliente = {};

			return {
				...state,
				filaActiva: cliente,
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
