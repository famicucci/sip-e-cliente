import {
	TRAER_PRECIOS,
	FILAS_LISTA,
	LISTA_PRECIOS,
	FILAS_BUSQUEDA,
	ERROR_PRECIOS,
} from '../../types';
import { filtrado, filtraListaPrecio } from '../../functions/filtroTablas.js';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_PRECIOS:
			return {
				...state,
				precios: action.payload,
				cargando: false,
			};
		case LISTA_PRECIOS:
			return {
				...state,
				lista: action.payload,
			};
		case FILAS_LISTA:
			return {
				...state,
				filas: filtraListaPrecio(action.payload.precios, action.payload.lista),
			};
		case FILAS_BUSQUEDA:
			const filasLista = filtraListaPrecio(
				action.payload.precios,
				action.payload.lista
			);
			return {
				...state,
				filas: filtrado(filasLista, action.payload.busqueda),
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
