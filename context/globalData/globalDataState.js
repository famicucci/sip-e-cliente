import React, { useReducer } from 'react';
import GlobalDataContext from './GlobalDataContext';
import GlobalDataReducer from './GlobalDataReducer';
import clienteAxios from '../../config/axios';

import {
	PTOS_STOCK_VENTAS,
	TRAER_PTOS_VENTA,
	TIPOS_ENVIO,
	TRAER_ESTADOS_ORDEN,
} from '../../types';

const GlobalDataState = (props) => {
	const initialState = {
		stockPoints: null,
		salePoints: null,
		shippingTypes: null,
		orderStatuses: null,
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
				type: TIPOS_ENVIO,
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

	return (
		<GlobalDataContext.Provider
			value={{
				stockPoints: state.stockPoints,
				salePoints: state.salePoints,
				shippingTypes: state.shippingTypes,
				orderStatuses: state.orderStatuses,
				getStockPoints,
				getSalePoints,
				getShippingTypes,
				getOrderStatuses,
			}}
		>
			{props.children}
		</GlobalDataContext.Provider>
	);
};

export default GlobalDataState;
