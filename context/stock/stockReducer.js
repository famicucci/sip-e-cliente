import {
	PTO_STOCK,
	TRAER_STOCK_PRODUCTO,
	FILAS_BUSQUEDA,
	FILAS_PTO_STOCK,
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
		case FILAS_PTO_STOCK:
			return {
				...state,
				filas: filtraPuntoStock(action.payload.stocks, action.payload.ptoStock),
			};
		default:
			return state;
	}
};

export default StockReducer;
