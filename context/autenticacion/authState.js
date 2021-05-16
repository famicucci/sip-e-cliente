import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authContext';
import clienteAxios from '../../config/axios';

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
	const iniciarSesion = async (datos) => {
		const respuesta = await clienteAxios.post('/api/usuarios/login', datos);
		console.log(respuesta.data.success);
		localStorage.setItem('token', respuesta.data.success);
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				iniciarSesion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
