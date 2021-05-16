import { LOGIN_EXITOSO, LOGIN_ERROR } from '../../types';

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
		case LOGIN_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				usuario: null,
				autenticado: null,
				mensaje: action.payload,
				cargando: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;
