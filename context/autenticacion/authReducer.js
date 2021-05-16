import { LOGIN_EXITOSO } from '../../types';

const AuthReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_EXITOSO:
			localStorage.setItem('token', action.payload.success);
			return {
				...state,
				autenticado: true,
				mensaje: null,
				cargando: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;
