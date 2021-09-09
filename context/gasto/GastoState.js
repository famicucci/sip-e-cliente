import React, { useReducer } from 'react';
import GastoContext from './GastoContext';
import GastoReducer from './GastoReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_GASTOS,
	SHOW_LOADING,
	MODIFICAR_ESTADO_PAGO,
	ACTIVAR_GASTO,
	MOSTRAR_MODAL_EDITAR_GASTO,
	MOSTRAR_MODAL_CREAR_GASTO,
	AGREGAR_GASTO,
	MODIFICAR_GASTO,
	MOSTRAR_ALERTA_GASTOS,
	OCULTAR_ALERTA_GASTOS,
} from '../../types';

const GastoState = (props) => {
	const initialState = {
		expenses: [],
		activatedExpense: null,
		openModalEditExpense: false,
		openModalCreateExpense: false,
		loading: true,
		mensajeGastos: null,
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
			await clienteAxios.put(`/api/gastos/${expenseId}`, {
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

	const handleOpenModalEditExpense = (expenseId) => {
		dispatch({
			type: ACTIVAR_GASTO,
			payload: expenseId,
		});

		dispatch({
			type: MOSTRAR_MODAL_EDITAR_GASTO,
			payload: expenseId ? true : false,
		});
	};

	const handleOpenModalCreateExpense = (boolean) => {
		dispatch({
			type: MOSTRAR_MODAL_CREAR_GASTO,
			payload: boolean,
		});
	};

	const createExpense = async (expense) => {
		try {
			const r = await clienteAxios.post('/api/gastos/', expense);

			dispatch({
				type: AGREGAR_GASTO,
				payload: r.data,
			});

			mostrarAlertaGastos('Creaste el gasto', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	const editExpense = async (expense) => {
		try {
			await clienteAxios.put(`/api/gastos/${state.activatedExpense}`, expense);

			dispatch({
				type: MODIFICAR_GASTO,
				payload: { ...expense, id: state.activatedExpense },
			});

			dispatch({
				type: ACTIVAR_GASTO,
				payload: null,
			});

			mostrarAlertaGastos('Modificaste el gasto', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	const mostrarAlertaGastos = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA_GASTOS,
			payload: { msg, categoria },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_GASTOS,
			});
		}, 4000);
	};

	return (
		<GastoContext.Provider
			value={{
				expenses: state.expenses,
				activatedExpense: state.activatedExpense,
				openModalEditExpense: state.openModalEditExpense,
				openModalCreateExpense: state.openModalCreateExpense,
				loading: state.loading,
				mensajeGastos: state.mensajeGastos,
				getExpenses,
				handleStatusPayment,
				handleOpenModalEditExpense,
				handleOpenModalCreateExpense,
				createExpense,
				editExpense,
				mostrarAlertaGastos,
			}}
		>
			{props.children}
		</GastoContext.Provider>
	);
};

export default GastoState;
