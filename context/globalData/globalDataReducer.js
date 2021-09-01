import {
	PTOS_STOCK_VENTAS,
	TRAER_PTOS_VENTA,
	TIPOS_ENVIO,
	TRAER_ESTADOS_ORDEN,
} from '../../types';

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
		case TIPOS_ENVIO:
			return {
				...state,
				shippingTypes: action.payload,
			};
		case TRAER_ESTADOS_ORDEN:
			return {
				...state,
				orderStatuses: action.payload,
			};
		default:
			return state;
	}
};

export default GlobalDataReducer;
