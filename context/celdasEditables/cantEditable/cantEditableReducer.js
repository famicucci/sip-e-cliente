import { ACTIVAR_FILA, NUEVA_CANTIDAD } from '../../../types';

const CantEditableReducer = (state, action) => {
	switch (action.type) {
		case ACTIVAR_FILA:
			return {
				...state,
				filaActiva: action.payload,
				cantidad: action.payload.cantidad,
			};
		case NUEVA_CANTIDAD:
			return {
				...state,
				cantidad: action.payload,
			};
		default:
			return state;
	}
};

export default CantEditableReducer;
