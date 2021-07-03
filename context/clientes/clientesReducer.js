import {
	TRAER_CLIENTES,
	FILAS_CLIENTES,
	CAMPO_CLIENTE_ACTIVO,
	LIMPIAR_CLIENTE_ACTIVO,
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
		case FILAS_CLIENTES:
			filas = filBus(state.clientes, action.payload);
			return {
				...state,
				filas: filas,
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
