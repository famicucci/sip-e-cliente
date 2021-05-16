import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
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
		cargando: true,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// las funciones
	const iniciarSesion = async (datos) => {
		try {
			const respuesta = await clienteAxios.post('/api/usuarios/login', datos);

			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,
			});
		} catch (error) {
			const alerta = {
				msg: error.response.data.msj,
				categoria: 'alerta-error',
			};
			dispatch({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
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
