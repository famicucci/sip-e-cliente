import {
	PTO_STOCK,
	TRAER_STOCK_PRODUCTO,
	FILAS_BUSQUEDA,
	FILAS_PTO_STOCK,
	PRODUCTO_ACTIVO,
	MODAL_OPEN,
	MODAL_CLOSE,
	ERROR_STOCK,
} from '../../types';
import { filtrado, filtraPuntoStock } from '../../functions/filtroTablas.js';

const StockReducer = (state, action) => {
	switch (action.type) {
		case PTO_STOCK:
			return {
				...state,
				ptoStock: action.payload,
			};
		case TRAER_STOCK_PRODUCTO:
			return {
				...state,
				stocks: action.payload,
			};
		case FILAS_BUSQUEDA:
			return {
				...state,
				filas: filtrado(action.payload.stocks, action.payload.busqueda),
			};
		case PRODUCTO_ACTIVO:
			return {
				...state,
				productoActivo: action.payload,
			};
		case FILAS_PTO_STOCK:
			return {
				...state,
				filas: filtraPuntoStock(action.payload.stocks, action.payload.ptoStock),
			};
		case MODAL_OPEN:
			return {
				...state,
				openModal: true,
			};
		case MODAL_CLOSE:
			return {
				...state,
				productoActivo: {},
				openModal: false,
			};
		case ERROR_STOCK:
			return {
				...state,
				mensaje: action.payload,
			};
		default:
			return state;
	}
};

export default StockReducer;
