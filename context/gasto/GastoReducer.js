import { TRAER_GASTOS } from '../../types';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case TRAER_GASTOS:
			return {
				...state,
				expenses: action.payload,
			};

		default:
			return state;
	}
};

export default PreciosReducer;
