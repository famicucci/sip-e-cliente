import {
	HERRAMIENTAS_PRECIOS,
	BUSQUEDA_ACTUAL,
	HERRAMIENTAS_STOCK_PRODUCTO,
} from '../../types';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case HERRAMIENTAS_PRECIOS:
			return {
				...state,
				buscador: true,
				selectListaPrecio: true,
				selectPtoStock: false,
			};
		case HERRAMIENTAS_STOCK_PRODUCTO:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
			};
		case BUSQUEDA_ACTUAL:
			return {
				...state,
				busqueda: action.payload,
			};

		default:
			return state;
	}
};

export default PreciosReducer;
