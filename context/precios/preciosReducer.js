import { TRAER_PRECIOS } from '../../types';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_PRECIOS:
			return {
				...state,
				precios: action.payload,
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
