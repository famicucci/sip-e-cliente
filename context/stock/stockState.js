import React, { useReducer } from 'react';
import StockContext from './stockContext';
import StockReducer from './stockReducer';
import clienteAxios from '../../config/axios';

import {
	PTO_STOCK,
	TRAER_STOCK_PRODUCTO,
	FILAS_BUSQUEDA,
	FILAS_PTO_STOCK,
	PRODUCTO_ACTIVO,
	MODAL_OPEN,
	MODAL_CLOSE,
	ERROR_STOCK,
} from '../../types';

const StockState = (props) => {
	const initialState = {
		stocks: [],
		filas: [],
		ptoStock: 1,
		productoActivo: {},
		openModal: false,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(StockReducer, initialState);

	// las funciones
	const traerStocksProducto = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/stock/total');

			dispatch({
				type: TRAER_STOCK_PRODUCTO,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_STOCK,
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

	const handleProductoActivo = async (codigo) => {
		try {
			const respuesta = await clienteAxios.get(`/api/stock/producto/${codigo}`);
			dispatch({
				type: PRODUCTO_ACTIVO,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_STOCK,
				payload: error,
			});
		}
	};

	const handleOpen = () => {
		dispatch({
			type: MODAL_OPEN,
		});
	};

	const handleClose = () => {
		dispatch({
			type: MODAL_CLOSE,
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
				productoActivo: state.productoActivo,
				openModal: state.openModal,
				handlePtoStock,
				traerStocksProducto,
				handleFilasBusqueda,
				handleFilasPtoStock,
				handleProductoActivo,
				handleOpen,
				handleClose,
			}}
		>
			{props.children}
		</StockContext.Provider>
	);
};

export default StockState;
