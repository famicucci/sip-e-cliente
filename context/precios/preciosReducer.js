import {
	TRAER_PRECIOS,
	LISTA_PRECIOS,
	ERROR_PRECIOS,
	FILAS_PRECIOS,
} from '../../types';
import { filtro } from '../../functions/filtroTablas.js';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_PRECIOS:
			let r = filtro(action.payload, state.lista, null);
			return {
				...state,
				precios: action.payload,
				filas: r,
				cargando: false,
			};
		case LISTA_PRECIOS:
			return {
				...state,
				lista: action.payload,
			};
		case FILAS_PRECIOS:
			r = filtro(state.precios, state.lista, action.payload);
			return {
				...state,
				filas: r,
			};
		case ERROR_PRECIOS:
			return {
				...state,
				mensaje: action.payload,
			};

		default:
			return state;
	}
};

export default PreciosReducer;
