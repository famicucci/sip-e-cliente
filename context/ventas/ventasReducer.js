import { PRECIOS_PTO_STOCK, PRECIOS_PTO_STOCK_FILAS } from '../../types';
import { filtraPtoStockListaPrecio } from '../../functions/filtroTablas.js';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRECIOS_PTO_STOCK:
			return {
				...state,
				preciosPtoStock: action.payload,
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

		default:
			return state;
	}
};

export default VentasReducer;
