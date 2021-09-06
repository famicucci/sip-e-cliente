import { TRAER_GASTOS, SHOW_LOADING } from '../../types';

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
		default:
			return state;
	}
};

export default PreciosReducer;
