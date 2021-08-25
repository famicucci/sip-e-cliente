import { TRAER_PTOS_VENTA } from '../../types';

const GlobalDataReducer = (state, action) => {
	switch (action.type) {
		case TRAER_PTOS_VENTA:
			return {
				...state,
				salePoints: action.payload,
			};
		default:
			return state;
	}
};

export default GlobalDataReducer;
