import React, { useReducer } from 'react';
import StockContext from './stockContext';
import StockReducer from './stockReducer';
import clienteAxios from '../../config/axios';

import {
	PTO_STOCK,
	TRAER_STOCK_PRODUCTO,
	FILAS_BUSQUEDA,
	FILAS_PTO_STOCK,
} from '../../types';

const StockState = (props) => {
	const initialState = {
		stocks: [],
		filas: [],
		ptoStock: 1,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(StockReducer, initialState);

	// las funciones
	const traerStocksProducto = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/stock/producto');

			dispatch({
				type: TRAER_STOCK_PRODUCTO,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_PRECIOS,
				payload: error,
			});
		}
	};

	const handleFilasPtoStock = (stocks, ptoStock) => {
		dispatch({
			type: FILAS_PTO_STOCK,
			payload: { stocks, ptoStock },
		});
	};

	const handleFilasBusqueda = (stocks, busqueda) => {
		dispatch({
			type: FILAS_BUSQUEDA,
			payload: { stocks, busqueda },
		});
	};

	const handlePtoStock = (ptoStock) => {
		dispatch({
			type: PTO_STOCK,
			payload: ptoStock,
		});
	};

	return (
		<StockContext.Provider
			value={{
				stocks: state.stocks,
				filas: state.filas,
				ptoStock: state.ptoStock,
				handlePtoStock,
				traerStocksProducto,
				handleFilasBusqueda,
				handleFilasPtoStock,
			}}
		>
			{props.children}
		</StockContext.Provider>
	);
};

export default StockState;
