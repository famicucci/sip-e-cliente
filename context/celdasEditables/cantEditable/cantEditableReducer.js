import {
	ACTIVAR_FILA,
	MOSTRAR_ALERTA,
	CONFIRMAR_CAMBIO_STOCK,
} from '../../../types';

const CantEditableReducer = (state, action) => {
	switch (action.type) {
		case ACTIVAR_FILA:
			return {
				...state,
				filaActiva: action.payload,
			};
		case MOSTRAR_ALERTA:
			return {
				...state,
				mensaje: action.payload.msj,
			};
		case CONFIRMAR_CAMBIO_STOCK:
			return {
				...state,
				filaActiva: {},
				mensaje: action.payload.msj,
			};
		default:
			return state;
	}
};

export default CantEditableReducer;
