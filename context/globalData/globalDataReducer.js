import { PTOS_STOCK_VENTAS, TRAER_PTOS_VENTA } from '../../types';

const GlobalDataReducer = (state, action) => {
	switch (action.type) {
		case PTOS_STOCK_VENTAS:
			return {
				...state,
				stockPoints: action.payload,
			};
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
