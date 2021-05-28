import React, { useReducer } from 'react';
import BarraHerramientasContext from './barraHerramientasContext';
import BarraHerramientasReducer from './barraHerramientasReducer';
import clienteAxios from '../../config/axios';

import {
	HERRAMIENTAS_PRECIOS,
	BUSQUEDA_ACTUAL,
	HERRAMIENTAS_STOCK_PRODUCTO,
	HERRAMIENTAS_STOCK_PTO_STOCK,
	HERRAMIENTAS_STOCK_MOVIMIENTOS,
	PTOS_STOCK,
	LISTAS_PRECIO,
} from '../../types';

const BarraHerramientasState = (props) => {
	const initialState = {
		buscador: false,
		selectListaPrecio: false,
		selectPtoStock: false,
		listasPrecio: null,
		ptosStock: null,
		busqueda: '',
	};

	const [state, dispatch] = useReducer(BarraHerramientasReducer, initialState);

	// las funciones
	const handleHerramientasPrecios = () => {
		dispatch({
			type: HERRAMIENTAS_PRECIOS,
		});
	};

	const handleHerramientasStockProducto = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_PRODUCTO,
		});
	};

	const handleHerramientasStockPtoStock = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_PTO_STOCK,
		});
	};

	const handleHerramientasMovimientosStock = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_MOVIMIENTOS,
		});
	};

	const handleBusqueda = (busqueda) => {
		dispatch({
			type: BUSQUEDA_ACTUAL,
			payload: busqueda,
		});
	};

	const traerPtosStock = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/stock/ptos-stock`);

			dispatch({
				type: PTOS_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const traerListasPrecio = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/precios/listas-precio`);

			dispatch({
				type: LISTAS_PRECIO,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<BarraHerramientasContext.Provider
			value={{
				buscador: state.buscador,
				selectListaPrecio: state.selectListaPrecio,
				selectPtoStock: state.selectPtoStock,
				busqueda: state.busqueda,
				ptosStock: state.ptosStock,
				listasPrecio: state.listasPrecio,
				handleHerramientasPrecios,
				handleHerramientasStockProducto,
				handleHerramientasStockPtoStock,
				handleHerramientasMovimientosStock,
				handleBusqueda,
				traerPtosStock,
				traerListasPrecio,
			}}
		>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasState;
