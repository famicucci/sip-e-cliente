import React, { useReducer } from 'react';
import StockContext from './stockContext';
import StockReducer from './stockReducer';
import clienteAxios from '../../config/axios';
import { ptoStockToSync } from '../../config/globalVariables';

import {
	TRAER_STOCK_PTO_STOCK,
	TRAER_PRODUCTOS_TIENDA_ONLINE,
	TRAER_MOVIMIENTOS_STOCK,
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
	ACTUALIZAR_STOCK,
	MOSTRAR_ALERTA_STOCK,
	OCULTAR_ALERTA_STOCK,
} from '../../types';

const StockState = (props) => {
	const initialState = {
		stocks: [],
		stocksTN: [],
		filas: [],
		ptoStock: 1,
		productoActivo: {},
		filaActivaProducto: {},
		openModal: false,
		mensaje: null,
		mensajeStock: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(StockReducer, initialState);

	// las funciones
	const traerStocksPtoStock = async () => {
		// get stock from sip-e
		try {
			const r = await clienteAxios.get('/api/stock/pto-stock/');
			const stockSipe = r.data;

			dispatch({
				type: TRAER_STOCK_PTO_STOCK,
				payload: stockSipe,
			});

			try {
				const r = await clienteAxios.get('/api/tiendanube/productos');

				dispatch({
					type: TRAER_PRODUCTOS_TIENDA_ONLINE,
					payload: r.data,
				});

				const stocksTiendaOnline = [];
				for (const product of r.data) {
					for (let variant of product.variants) {
						if (variant.stock) {
							const el = {
								ProductoCodigo: variant.sku,
								cantidad: variant.stock,
								PtoStockId: ptoStockToSync,
							};

							stocksTiendaOnline.push(el);
						}
					}
				}

				let indexStockSipe = {};
				stockSipe.forEach((x) => {
					if (x.PtoStockId === ptoStockToSync)
						indexStockSipe[x.ProductoCodigo] = indexStockSipe[
							x.ProductoCodigo
						] ?? { ...x };
				});

				// compare arrays
				let arrayDiff = [];
				stocksTiendaOnline.forEach((x) => {
					if (x.cantidad !== indexStockSipe[x.ProductoCodigo]['cantidad']) {
						arrayDiff.push(x);
					}
				});

				if (arrayDiff.length > 0)
					dispatch({
						type: MOSTRAR_ALERTA_STOCK,
						payload: {
							msg: 'Actualizando stock de tienda nube...',
							severity: 'warning',
						},
					});

				arrayDiff.forEach(async (x, i) => {
					try {
						await clienteAxios.put('/api/stock/', x);

						dispatch({
							type: ACTUALIZAR_STOCK,
							payload: x,
						});

						if (arrayDiff.length === i + 1) {
							dispatch({
								type: OCULTAR_ALERTA_STOCK,
							});
							mostrarAlertaEditarOrdenes(
								'Stocks actualizados con Tienda Nube!',
								'success'
							);
						}
					} catch (error) {
						mostrarAlertaEditarOrdenes('Hubo un error', 'error');
					}
				});
			} catch (error) {
				mostrarAlertaEditarOrdenes('Hubo un error', 'error');
			}
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const traerMovimientosStock = async (bus) => {
		try {
			const r = await clienteAxios.get('/api/stock/movimientos/');

			dispatch({
				type: TRAER_MOVIMIENTOS_STOCK,
				payload: { arrayProd: r.data, bus: bus },
			});
		} catch (error) {
			console.log(error);
		}
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

			dispatch({
				type: ACTUALIZAR_STOCK,
				payload: datos,
			});

			// update in TN
			if (datos.PtoStockId === ptoStockToSync)
				try {
					for (const product of state.stocksTN) {
						for (const variant of product.variants) {
							if (variant.sku === datos.ProductoCodigo) {
								await clienteAxios.put(
									`/api/tiendanube/stock/${variant.product_id}/${variant.id}`,
									{ qty: datos.cantidad }
								);
								mostrarAlertaEditarOrdenes(
									'Stock actualizado en Tienda Nube',
									'success'
								);
							}
						}
					}
				} catch (error) {
					mostrarAlertaEditarOrdenes('Hubo un error!', 'error');
				}
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error!', 'error');
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

			// update in TN
			if (datos.PtoStockId === ptoStockToSync)
				try {
					for (const product of state.stocksTN) {
						for (const variant of product.variants) {
							if (variant.sku === datos.ProductoCodigo) {
								await clienteAxios.put(
									`/api/tiendanube/stock/${variant.product_id}/${variant.id}`,
									{ qty: datos.cantidad }
								);
								mostrarAlertaEditarOrdenes(
									'Stock actualizado en Tienda Nube',
									'success'
								);
							}
						}
					}
				} catch (error) {
					mostrarAlertaEditarOrdenes('Hubo un error!', 'error');
				}
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error!', 'error');
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

		dispatch({
			type: PRODUCTO_ACTIVO,
			payload: {},
		});
	};

	const handlePtoStock = (ptoStock) => {
		dispatch({
			type: PTO_STOCK,
			payload: ptoStock,
		});
	};

	const mostrarAlertaEditarOrdenes = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA_STOCK,
			payload: { msg, categoria },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_STOCK,
			});
		}, 4000);
	};

	return (
		<StockContext.Provider
			value={{
				stocks: state.stocks,
				stocksTN: state.stocksTN,
				filas: state.filas,
				ptoStock: state.ptoStock,
				productoActivo: state.productoActivo,
				filaActivaProducto: state.filaActivaProducto,
				openModal: state.openModal,
				mensaje: state.mensaje,
				mensajeStock: state.mensajeStock,
				cargando: state.cargando,
				handlePtoStock,
				traerStocksPtoStock,
				traerMovimientosStock,
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
