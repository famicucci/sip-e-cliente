import React, { useReducer } from 'react';
import GastoContext from './GastoContext';
import GastoReducer from './GastoReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_GASTOS,
	SHOW_LOADING,
	MODIFICAR_ESTADO_PAGO,
	ACTIVAR_GASTO,
} from '../../types';

const GastoState = (props) => {
	const initialState = {
		expenses: [],
		activatedExpense: null,
		loading: true,
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

			dispatch({
				type: SHOW_LOADING,
				payload: false,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleStatusPayment = async (expenseId, statusPayment) => {
		// call bd
		try {
			const r = await clienteAxios.put(`/api/gastos/${expenseId}`, {
				estado: statusPayment,
			});

			dispatch({
				type: MODIFICAR_ESTADO_PAGO,
				payload: { expenseId, statusPayment },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleActivateExpense = async (expenseId) => {
		dispatch({
			type: ACTIVAR_GASTO,
			payload: expenseId,
		});
	};

	return (
		<GastoContext.Provider
			value={{
				expenses: state.expenses,
				activatedExpense: state.activatedExpense,
				loading: state.loading,
				getExpenses,
				handleStatusPayment,
				handleActivateExpense,
			}}
		>
			{props.children}
		</GastoContext.Provider>
	);
};

export default GastoState;
