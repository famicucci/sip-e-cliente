import {
	PTOS_STOCK_VENTAS,
	TRAER_PTOS_VENTA,
	TRAER_TIPOS_ENVIO,
	TRAER_ESTADOS_ORDEN,
	TRAER_METODOS_PAGO,
	TRAER_CATEGORIAS_GASTOS,
	TRAER_SUBCATEGORIAS_GASTOS,
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
		case TRAER_CATEGORIAS_GASTOS:
			return {
				...state,
				expenseCategories: action.payload,
			};
		case TRAER_SUBCATEGORIAS_GASTOS:
			return {
				...state,
				expenseSubcategories: action.payload,
			};
		default:
			return state;
	}
};

export default GlobalDataReducer;
