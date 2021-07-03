import {
	TRAER_CLIENTES,
	CAMPO_CLIENTE_ACTIVO,
	LIMPIAR_CLIENTE_ACTIVO,
	MOSTRAR_ERROR,
} from '../../types';

const ClientesReducer = (state, action) => {
	switch (action.type) {
		case TRAER_CLIENTES:
			return {
				...state,
				clientes: action.payload,
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
