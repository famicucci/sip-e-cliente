import { PTO_STOCK } from '../../types';
import { filtrado, filtraListaPrecio } from '../../functions/filtroTablas.js';

const StockReducer = (state, action) => {
	switch (action.type) {
		case PTO_STOCK:
			return {
				...state,
				ptoStock: action.payload,
			};
		default:
			return state;
	}
};

export default StockReducer;
