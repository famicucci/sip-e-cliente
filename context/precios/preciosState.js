import React, { useReducer } from 'react';
import PreciosContext from './preciosContext';
import PreciosReducer from './preciosReducer';
import clienteAxios from '../../config/axios';

import { TRAER_PRECIOS, ERROR_PRECIOS } from '../../types';

const PreciosState = (props) => {
	const initialState = {
		precios: [],
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

	return (
		<PreciosContext.Provider
			value={{
				precios: state.precios,
				traerPrecios,
			}}
		>
			{props.children}
		</PreciosContext.Provider>
	);
};

export default PreciosState;
