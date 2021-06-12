import React, { useReducer } from 'react';
import StockContext from './stockContext';
import StockReducer from './stockReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_STOCK_TOTAL,
	TRAER_STOCK_PTO_STOCK,
	TRAER_MOVIMIENTOS_STOCK,
	FILAS_STOCK_TOTAL,
	FILAS_PTO_STOCK,
	FILAS_MOVIMIENTOS_STOCK,
	PTO_STOCK,
	PRODUCTO_ACTIVO,
	ACTIVAR_FILA,
	CONFIRMAR_CAMBIO_STOCK,
	CONFIRMAR_CAMBIO_STOCK_PTO_STOCK,
	NUEVA_CANTIDAD_STOCK,
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
		filaActivaProducto: {},
		openModal: false,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(StockReducer, initialState);

	// las funciones
	const traerStocksTotal = async (bus) => {
		try {
			const r = await clienteAxios.get('/api/stock/total');

			dispatch({
				type: TRAER_STOCK_TOTAL,
				payload: { arrayProd: r.data, bus: bus },
			});
		} catch (error) {
			dispatch({
				type: ERROR_STOCK,
				payload: error,
			});
		}
	};

	const traerStocksPtoStock = async (id) => {
		try {
			const respuesta = await clienteAxios.get('/api/stock/pto-stock/');

			dispatch({
				type: TRAER_STOCK_PTO_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_STOCK,
				payload: error,
			});
		}
	};

	const traerMovimientosStock = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/stock/movimientos/');

			dispatch({
				type: TRAER_MOVIMIENTOS_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleFilasPtoStock = (bus) => {
		dispatch({
			type: FILAS_PTO_STOCK,
			payload: bus,
		});
	};

	const handleFilasStockTotal = (bus) => {
		dispatch({
			type: FILAS_STOCK_TOTAL,
			payload: bus,
		});
	};

	const handleFilasMovStock = (bus) => {
		dispatch({
			type: FILAS_MOVIMIENTOS_STOCK,
			payload: bus,
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

	// las funciones
	const handleFilaActiva = (fila) => {
		dispatch({
			type: ACTIVAR_FILA,
			payload: fila,
		});
	};

	const modificarStock = async (fila) => {
		const datos = {
			ProductoCodigo: fila.ProductoCodigo,
			PtoStockId: fila.PtoStockId,
			cantidad: fila.cantidad,
			motivo: 'movimiento',
		};

		try {
			const respuesta = await clienteAxios.put('/api/stock/', datos);

			dispatch({
				type: CONFIRMAR_CAMBIO_STOCK,
				payload: { respuesta, fila },
			});
		} catch (error) {
			const alerta = {
				msg: error.response.data.msg,
				categoria: error.response.data.severity,
			};
			dispatch({
				type: ERROR_STOCK,
				payload: alerta,
			});
		}
	};

	const modificarStockPtoStock = async () => {
		const datos = {
			ProductoCodigo: state.filaActivaProducto.ProductoCodigo,
			PtoStockId: state.filaActivaProducto.PtoStockId,
			cantidad: state.filaActivaProducto.cantidad,
			motivo: 'movimiento',
		};

		try {
			const respuesta = await clienteAxios.put('/api/stock/', datos);

			dispatch({
				type: CONFIRMAR_CAMBIO_STOCK_PTO_STOCK,
				payload: { respuesta },
			});
		} catch (error) {
			const alerta = {
				msg: error.response.data.msg,
				categoria: error.response.data.severity,
			};
			dispatch({
				type: ERROR_STOCK,
				payload: alerta,
			});
		}
	};

	const handleNuevaCantidad = (cantidad) => {
		dispatch({
			type: NUEVA_CANTIDAD_STOCK,
			payload: cantidad,
		});
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
				filaActivaProducto: state.filaActivaProducto,
				openModal: state.openModal,
				mensaje: state.mensaje,
				cargando: state.cargando,
				handlePtoStock,
				traerStocksTotal,
				traerStocksPtoStock,
				traerMovimientosStock,
				handleFilasStockTotal,
				handleFilasPtoStock,
				handleFilasMovStock,
				handleProductoActivo,
				handleFilaActiva,
				modificarStock,
				modificarStockPtoStock,
				handleNuevaCantidad,
				handleOpen,
				handleClose,
			}}
		>
			{props.children}
		</StockContext.Provider>
	);
};

export default StockState;
