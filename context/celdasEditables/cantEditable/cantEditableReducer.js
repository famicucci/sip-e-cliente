import { ACTIVAR_FILA } from '../../../types';

const CantEditableReducer = (state, action) => {
	switch (action.type) {
		case ACTIVAR_FILA:
			return {
				...state,
				filaActiva: action.payload,
			};
		default:
			return state;
	}
};

export default CantEditableReducer;
