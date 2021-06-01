import React, { useReducer } from 'react';
import VentasContext from './ventasContext';
import VentasReducer from './ventasReducer';
import clienteAxios from '../../config/axios';

import {
	PRECIOS_PTO_STOCK,
	PRECIOS_STOCK_TOTAL,
	PRECIOS_PTO_STOCK_FILAS,
	PRECIOS_STOCK_TOTAL_FILAS,
	PRECIOS_PRODUCTOS_SIN_STOCK_FILAS,
	PTO_STOCK_VENTAS,
	LISTA_PRECIO_VENTAS,
	VALOR_RADIO_VENTAS,
} from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		preciosStockTotal: [],
		filas: [],
		ptoStock: 1,
		listaPrecio: 1,
		valorRadio: 'pto-stock',
	};

	const [state, dispatch] = useReducer(VentasReducer, initialState);

	// las funciones
	const traerPreciosPtoStock = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/ventas/pto-stock/');

			dispatch({
				type: PRECIOS_PTO_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const traerPreciosStockTotal = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/ventas/total/');

			dispatch({
				type: PRECIOS_STOCK_TOTAL,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleFilasPtoStock = () => {
		dispatch({
			type: PRECIOS_PTO_STOCK_FILAS,
		});
	};

	const handleFilasStockTotal = () => {
		dispatch({
			type: PRECIOS_STOCK_TOTAL_FILAS,
		});
	};

	const handleFilasSinStock = () => {
		dispatch({
			type: PRECIOS_PRODUCTOS_SIN_STOCK_FILAS,
		});
	};

	const handlePtoStock = (ptoStock) => {
		dispatch({
			type: PTO_STOCK_VENTAS,
			payload: ptoStock,
		});
	};

	const handleListaPrecio = (listaPrecio) => {
		dispatch({
			type: LISTA_PRECIO_VENTAS,
			payload: listaPrecio,
		});
	};

	const handleValorRadio = (valor) => {
		dispatch({
			type: VALOR_RADIO_VENTAS,
			payload: valor,
		});
	};

	return (
		<VentasContext.Provider
			value={{
				preciosPtoStock: state.preciosPtoStock,
				preciosStockTotal: state.preciosStockTotal,
				filas: state.filas,
				ptoStock: state.ptoStock,
				listaPrecio: state.listaPrecio,
				valorRadio: state.valorRadio,
				traerPreciosPtoStock,
				traerPreciosStockTotal,
				handleFilasPtoStock,
				handleFilasStockTotal,
				handleFilasSinStock,
				handlePtoStock,
				handleListaPrecio,
				handleValorRadio,
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
