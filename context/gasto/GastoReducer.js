import { TRAER_GASTOS, SHOW_LOADING, MODIFICAR_ESTADO_PAGO } from '../../types';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_GASTOS:
			return {
				...state,
				expenses: action.payload,
			};
		case SHOW_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case MODIFICAR_ESTADO_PAGO:
			return {
				...state,
				expenses: state.expenses.map((x) =>
					x.id === action.payload.expenseId
						? { ...x, estado: action.payload.statusPayment }
						: x
				),
			};
		default:
			return state;
	}
};

export default PreciosReducer;
