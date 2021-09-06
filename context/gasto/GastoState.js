import React, { useReducer } from 'react';
import GastoContext from './GastoContext';
import GastoReducer from './GastoReducer';
import clienteAxios from '../../config/axios';

import { TRAER_GASTOS } from '../../types';

const GastoState = (props) => {
	const initialState = {
		expenses: null,
	};

	const [state, dispatch] = useReducer(GastoReducer, initialState);

	// las funciones
	const getExpenses = async () => {
		// call bd
		try {
			const r = await clienteAxios.get('/api/gastos');

			dispatch({
				type: TRAER_GASTOS,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<GastoContext.Provider value={{ getExpenses }}>
			{props.children}
		</GastoContext.Provider>
	);
};

export default GastoState;
