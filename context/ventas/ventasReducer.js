import { PRECIOS_PTO_STOCK } from '../../types';
import { filtrado, filtraPuntoStock } from '../../functions/filtroTablas.js';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRECIOS_PTO_STOCK:
			return {
				...state,
				preciosPtoStock: action.payload,
			};

		default:
			return state;
	}
};

export default VentasReducer;
