import {
	PTOS_STOCK_VENTAS,
	TRAER_PTOS_VENTA,
	TRAER_TIPOS_ENVIO,
	TRAER_ESTADOS_ORDEN,
	TRAER_METODOS_PAGO,
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
		case TRAER_TIPOS_ENVIO:
			return {
				...state,
				shippingTypes: action.payload,
			};
		case TRAER_ESTADOS_ORDEN:
			return {
				...state,
				orderStatuses: action.payload,
			};
		case TRAER_METODOS_PAGO:
			return {
				...state,
				paymentMethods: action.payload,
			};
		default:
			return state;
	}
};

export default GlobalDataReducer;
