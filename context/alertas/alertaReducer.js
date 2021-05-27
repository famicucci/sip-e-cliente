import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaReducer = (state, action) => {
	switch (action.type) {
		case MOSTRAR_ALERTA:
			console.log(action.payload.msg);
			console.log(action.payload.categoria);
			return {
				...state,
				alerta: action.payload,
			};
		case OCULTAR_ALERTA:
			return {
				...state,
				alerta: null,
			};

		default:
			return state;
	}
};

export default AlertaReducer;
