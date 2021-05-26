import {
	PRODUCTO_STATE,
	ACTIVAR_FILA,
	MOSTRAR_ALERTA,
	CONFIRMAR_CAMBIO_STOCK,
} from '../../../types';

const CantEditableReducer = (state, action) => {
	switch (action.type) {
		case PRODUCTO_STATE:
			return {
				...state,
				productoActivo: action.payload,
			};
		case ACTIVAR_FILA:
			return {
				...state,
				idFilaActiva: action.payload,
			};
		case MOSTRAR_ALERTA:
			return {
				...state,
				mensaje: action.payload.msj,
			};
		case CONFIRMAR_CAMBIO_STOCK:
			return {
				...state,
				// productoActivo: //recibir la nueva cantidad de bd y actualizar lo que corresponda del objeto,
				idFilaActiva: null,
				mensaje: action.payload.msj,
			};
		default:
			return state;
	}
};

export default CantEditableReducer;
