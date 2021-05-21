import {
	TRAER_PRECIOS,
	FILAS_PRECIOS,
	LISTA_PRECIOS,
	ERROR_PRECIOS,
} from '../../types';
import { filtrado, filtraListaPrecio } from '../../functions/filtroTablas.js';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_PRECIOS:
			return {
				...state,
				precios: action.payload,
			};
		case ERROR_PRECIOS:
			return {
				...state,
				mensaje: action.payload,
			};
		case FILAS_PRECIOS:
			return {
				...state,
				filas: filtraListaPrecio(action.payload.precios, action.payload.lista),
			};
		case LISTA_PRECIOS:
			return {
				...state,
				lista: action.payload,
			};

		default:
			return state;
	}
};

export default PreciosReducer;
