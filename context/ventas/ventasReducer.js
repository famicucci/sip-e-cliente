import {
	PRECIOS_PTO_STOCK,
	PRECIOS_STOCK_TOTAL,
	PRECIOS_PTO_STOCK_FILAS,
	PTO_STOCK_VENTAS,
	LISTA_PRECIO_VENTAS,
	VALOR_RADIO_VENTAS,
} from '../../types';
import { filtraPtoStockListaPrecio } from '../../functions/filtroTablas.js';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRECIOS_PTO_STOCK:
			return {
				...state,
				preciosPtoStock: action.payload,
			};
		case PRECIOS_STOCK_TOTAL:
			return {
				...state,
				preciosStockTotal: action.payload,
			};
		case PRECIOS_PTO_STOCK_FILAS:
			const filas = filtraPtoStockListaPrecio(
				state.preciosPtoStock,
				state.ptoStock,
				state.listaPrecio
			);
			return {
				...state,
				filas: filas,
			};
		case PTO_STOCK_VENTAS:
			return {
				...state,
				ptoStock: action.payload,
			};
		case LISTA_PRECIO_VENTAS:
			return {
				...state,
				listaPrecio: action.payload,
			};
		case VALOR_RADIO_VENTAS:
			return {
				...state,
				valorRadio: action.payload,
			};
		default:
			return state;
	}
};

export default VentasReducer;
