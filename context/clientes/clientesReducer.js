import { CAMPO_CLIENTE_ACTIVO } from '../../types';

const ClientesReducer = (state, action) => {
	switch (action.type) {
		case CAMPO_CLIENTE_ACTIVO:
			return {
				...state,
				clienteActivo: {
					...state.clienteActivo,
					[action.payload.attr]: action.payload.val,
				},
			};

		default:
			return state;
	}
};

export default ClientesReducer;
