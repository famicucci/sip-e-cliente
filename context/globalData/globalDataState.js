import React, { useReducer } from 'react';
import GlobalDataContext from './GlobalDataContext';
import GlobalDataReducer from './GlobalDataReducer';
import clienteAxios from '../../config/axios';

import {
	PTOS_STOCK_VENTAS,
	TRAER_PTOS_VENTA,
	TRAER_TIPOS_ENVIO,
	TRAER_ESTADOS_ORDEN,
	TRAER_METODOS_PAGO,
	TRAER_CATEGORIAS_GASTOS,
	TRAER_SUBCATEGORIAS_GASTOS,
	TRAER_FACTURAS,
	ACTUALIZAR_FECHA_INICIO,
	ACTUALIZAR_FECHA_FIN,
	SHOW_LOADING,
} from '../../types';

const GlobalDataState = (props) => {
	const initialState = {
		stockPoints: null,
		salePoints: null,
		shippingTypes: null,
		orderStatuses: null,
		paymentMethods: null,
		expenseCategories: null,
		expenseSubcategories: null,
		invoices: [],
		startDate: null,
		endDate: null,
		loadingGlobalData: true,
	};

	const [state, dispatch] = useReducer(GlobalDataReducer, initialState);

	const getStockPoints = async () => {
		const r = await clienteAxios.get(`/api/stock/ptos-stock`);

		dispatch({
			type: PTOS_STOCK_VENTAS,
			payload: r.data,
		});
	};

	const getSalePoints = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/ventas/ptos-venta`);

			dispatch({
				type: TRAER_PTOS_VENTA,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getShippingTypes = async () => {
		try {
			const r = await clienteAxios.get(`/api/tipos-envio`);

			dispatch({
				type: TRAER_TIPOS_ENVIO,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getOrderStatuses = async () => {
		try {
			const r = await clienteAxios.get('/api/estados-orden/');

			dispatch({
				type: TRAER_ESTADOS_ORDEN,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getPaymentMethods = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/metodos-pago`);

			dispatch({
				type: TRAER_METODOS_PAGO,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getCategorieExpenses = async () => {
		try {
			const r = await clienteAxios.get(`/api/gastos/categorias`);

			dispatch({
				type: TRAER_CATEGORIAS_GASTOS,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getSubcategorieExpenses = async () => {
		try {
			const r = await clienteAxios.get(`/api/gastos/subcategorias`);

			dispatch({
				type: TRAER_SUBCATEGORIAS_GASTOS,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getInvoicing = async (startDate, endDate) => {
		try {
			const r = await clienteAxios.get(
				`/api/facturas/${JSON.stringify({ startDate, endDate })}`
			);

			dispatch({
				type: TRAER_FACTURAS,
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

	const handleStartDate = (date) => {
		dispatch({
			type: ACTUALIZAR_FECHA_INICIO,
			payload: date,
		});
	};

	const handleEndDate = (date) => {
		dispatch({
			type: ACTUALIZAR_FECHA_FIN,
			payload: date,
		});
	};

	return (
		<GlobalDataContext.Provider
			value={{
				stockPoints: state.stockPoints,
				salePoints: state.salePoints,
				shippingTypes: state.shippingTypes,
				orderStatuses: state.orderStatuses,
				paymentMethods: state.paymentMethods,
				expenseCategories: state.expenseCategories,
				expenseSubcategories: state.expenseSubcategories,
				invoices: state.invoices,
				startDate: state.startDate,
				endDate: state.endDate,
				loadingGlobalData: state.loadingGlobalData,
				getStockPoints,
				getSalePoints,
				getShippingTypes,
				getOrderStatuses,
				getPaymentMethods,
				getCategorieExpenses,
				getSubcategorieExpenses,
				getInvoicing,
				handleStartDate,
				handleEndDate,
			}}
		>
			{props.children}
		</GlobalDataContext.Provider>
	);
};

export default GlobalDataState;
