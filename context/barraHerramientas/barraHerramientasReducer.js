import { HERRAMIENTAS_PRECIOS, BUSQUEDA_ACTUAL } from '../../types';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case HERRAMIENTAS_PRECIOS:
			return {
				...state,
				buscador: true,
				selectListaPrecio: true,
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
