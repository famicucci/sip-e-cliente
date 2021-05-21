import React, { useReducer } from 'react';
import PreciosContext from './preciosContext';
import PreciosReducer from './preciosReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_PRECIOS,
	FILAS_PRECIOS,
	LISTA_PRECIOS,
	ERROR_PRECIOS,
} from '../../types';

const PreciosState = (props) => {
	const initialState = {
		precios: [],
		filas: [],
		lista: 1,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(PreciosReducer, initialState);

	// las funciones
	const traerPrecios = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/precios');

			dispatch({
				type: TRAER_PRECIOS,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_PRECIOS,
				payload: error,
			});
		}
	};

	const handleFilas = (precios, lista) => {
		dispatch({
			type: FILAS_PRECIOS,
			payload: { precios, lista },
		});
	};

	const handleLista = (lista) => {
		dispatch({
			type: LISTA_PRECIOS,
			payload: lista,
		});
	};

	return (
		<PreciosContext.Provider
			value={{
				precios: state.precios,
				lista: state.lista,
				filas: state.filas,
				traerPrecios,
				handleFilas,
				handleLista,
			}}
		>
			{props.children}
		</PreciosContext.Provider>
	);
};

export default PreciosState;
