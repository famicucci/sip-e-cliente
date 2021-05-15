import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authContext';

import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types';

const AuthState = (props) => {
	const initialState = {
		token: null,
		autenticado: null,
		usuario: null,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// las funciones

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
