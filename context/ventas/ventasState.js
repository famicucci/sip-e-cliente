import React, { useReducer } from 'react';
import VentasContext from './ventasContext';
import VentasReducer from './ventasReducer';
import clienteAxios from '../../config/axios';
import { Direccion } from '../../functions/envio';

import {
	PRODUCTOS_VENTAS,
	PTO_STOCK_VENTAS,
	PTOS_STOCK_VENTAS,
	LISTA_PRECIO_VENTAS,
	VALOR_RADIO_VENTAS,
	CARRITO_AGREGAR_PRODUCTO,
	CARRITO_QUITAR_PRODUCTO,
	CARRITO_MODIFICAR_CANTIDAD,
	CARRITO_MODIFICAR_PRECIO,
	CARRITO_RESTAURAR_PRODUCTOS,
	CARRITO_ELIMINAR,
	STOCK_MODIFICAR_CANTIDAD,
	MODO_CARGA_VENTA,
	AGREGAR_CLIENTE,
	ELIMINAR_CLIENTE,
	AGREGAR_ENVIO,
	ELIMINAR_ENVIO,
	AGREGAR_NOTA,
	ELIMINAR_NOTA,
	AGREGAR_ORDEN_ECOMMERCE,
	ELIMINAR_ORDEN_ECOMMERCE,
	PTOS_VENTA,
	TIPOS_ENVIO,
	PTO_VENTA,
	ELIMINAR_PTO_VENTA,
	TRAER_ESTADOS_ORDEN,
	AGREGAR_ORDEN_A_MODIFICAR,
	ELIMINAR_ORDEN_A_MODIFICAR,
	ORDEN_EDITADA,
	MODAL_DETALLE_ORDEN,
	MODAL_CLOSE,
	MOSTRAR_ALERTA_VENTAS,
	OCULTAR_ALERTA_VENTAS,
	ACTIVAR_ORDEN,
} from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		ordenCreada: null,
		ptoStock: { descripcion: 'Showroom', id: 1 },
		ptoVenta: 1,
		ordenEcommerce: null,
		cliente: null,
		envio: null,
		nota: null,
		listaPrecio: { descripcion: 'Lista Minorista', id: 1 },
		valorRadio: 'pto-stock',
		carrito: [],
		ptosStock: null, // global state?
		ptosVenta: null, // global state?
		tiposEnvio: null, // global state?
		estadosOrden: [], // global state?
		modo: 'manual',
		orderToModify: null,
		orderEdited: false,
		cargando: false,
		mensaje: null,
		mensajeVentas: null,
	};

	const [state, dispatch] = useReducer(VentasReducer, initialState);

	// las funciones
	const traerProductos = async () => {
		try {
			let ptoStock = await clienteAxios.get('/api/ventas/pto-stock/');

			dispatch({
				type: PRODUCTOS_VENTAS,
				payload: ptoStock.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handlePtoStock = (ptoStock) => {
		dispatch({
			type: PTO_STOCK_VENTAS,
			payload: ptoStock,
		});
	};

	const traerPtosStock = async () => {
		const r = await clienteAxios.get(`/api/stock/ptos-stock`);

		dispatch({
			type: PTOS_STOCK_VENTAS,
			payload: r.data,
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

	const handleCarrito = (product) => {
		const alreadyInTheCart = state.carrito.find(
			(x) =>
				x.ProductoCodigo === product.ProductoCodigo &&
				x.PtoStockId === product.PtoStockId
		);

		if (!alreadyInTheCart) {
			product.cantidad = 1;
			dispatch({
				type: CARRITO_AGREGAR_PRODUCTO,
				payload: product,
			});
		} else if (alreadyInTheCart) {
			alreadyInTheCart.cantidad += product.cantidad;
			dispatch({
				type: CARRITO_MODIFICAR_CANTIDAD,
				payload: alreadyInTheCart,
			});
		}

		if (product.PtoStockId !== 0)
			dispatch({
				type: STOCK_MODIFICAR_CANTIDAD,
				payload: {
					ProductoCodigo: product.ProductoCodigo,
					PtoStockId: product.PtoStockId,
					qty: -product.cantidad,
				},
			});
	};

	const restoreCart = (cart) => {
		dispatch({
			type: CARRITO_RESTAURAR_PRODUCTOS,
			payload: cart,
		});

		cart.forEach((x) => {
			if (x.PtoStockId !== 0)
				dispatch({
					type: STOCK_MODIFICAR_CANTIDAD,
					payload: {
						ProductoCodigo: x.ProductoCodigo,
						PtoStockId: x.PtoStockId,
						qty: -x.cantidad,
					},
				});
		});
	};

	const handleRemoveProductCart = (code) => {
		dispatch({
			type: CARRITO_QUITAR_PRODUCTO,
			payload: code,
		});

		state.carrito.forEach((x) => {
			if (x.ProductoCodigo === code && x.PtoStockId !== 0)
				dispatch({
					type: STOCK_MODIFICAR_CANTIDAD,
					payload: {
						ProductoCodigo: x.ProductoCodigo,
						PtoStockId: x.PtoStockId,
						qty: x.cantidad,
					},
				});
		});
	};

	const handlePriceCart = (code, price) => {
		dispatch({
			type: CARRITO_MODIFICAR_PRECIO,
			payload: { code, price },
		});
	};

	const handleModo = (val) => {
		dispatch({
			type: MODO_CARGA_VENTA,
			payload: val,
		});
	};

	const handleCliente = (client) => {
		if (client)
			dispatch({
				type: AGREGAR_CLIENTE,
				payload: client,
			});
		else
			dispatch({
				type: ELIMINAR_CLIENTE,
			});
	};

	const handleEnvio = (shipping) => {
		dispatch({
			type: AGREGAR_ENVIO,
			payload: shipping,
		});
	};

	const crearOrden = async () => {
		let direccionEnvio;
		if (state.envio.modoDirecc === 'select' && state.envio.select) {
			direccionEnvio = Direccion.transformDirection(state.envio.select);
		} else if (state.envio.modoDirecc === 'input') {
			direccionEnvio = state.envio.input;
		}

		let OrdenEstadoId = 2;
		const detalleOrden = state.carrito.map((x) => {
			const productToProduction = x.PtoStockId === 0;

			if (productToProduction) OrdenEstadoId = 1;

			return {
				cantidad: x.cantidad,
				pu: x['Producto.Precios.pu'],
				origen: x.origen,
				ProductoCodigo: x.ProductoCodigo,
				PtoStockId: productToProduction ? null : x.PtoStockId,
			};
		});

		const paraCrearOrden = {
			observaciones: state.nota,
			direccionEnvio: direccionEnvio,
			tarifaEnvio: state.envio.costo,
			TipoEnvioId: state.envio.tipo,
			ClienteId: state.cliente.id,
			ordenEcommerce: state.ordenEcommerce,
			PtoVentaId: state.ptoVenta,
			OrdenEstadoId: OrdenEstadoId, // va en automático
			detalleOrden: detalleOrden,
		};

		try {
			let order = await clienteAxios.post('/api/ordenes/', paraCrearOrden);
			console.log(order);

			try {
				const createdOrder = await clienteAxios.get(
					`/api/ordenes/${order.data.id}`
				);

				dispatch({
					type: ACTIVAR_ORDEN,
					payload: createdOrder.data,
				});

				dispatch({
					type: CARRITO_ELIMINAR,
				});

				dispatch({
					type: ELIMINAR_ENVIO,
				});

				dispatch({
					type: ELIMINAR_CLIENTE,
				});

				dispatch({
					type: ELIMINAR_NOTA,
				});

				dispatch({
					type: ELIMINAR_ORDEN_ECOMMERCE,
				});

				dispatch({
					type: ELIMINAR_PTO_VENTA,
				});
			} catch (error) {
				mostrarAlertaVentas('Hubo un error', 'error');
			}
		} catch (error) {
			mostrarAlertaVentas('Hubo un error al crear la orden', 'error');
		}
	};

	const handleNota = (note) => {
		if (note)
			dispatch({
				type: AGREGAR_NOTA,
				payload: note,
			});
		else
			dispatch({
				type: ELIMINAR_NOTA,
			});
	};

	const handleInputOrdenEcommerce = (val) => {
		dispatch({
			type: AGREGAR_ORDEN_ECOMMERCE,
			payload: val,
		});
	};

	const traerPtosVenta = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/ventas/ptos-venta`);

			dispatch({
				type: PTOS_VENTA,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
			// dispatch({
			// 	type: ERROR_BARRA_HERRAMIENTAS,
			// 	payload: error,
			// });
		}
	};

	const traerTiposEnvio = async () => {
		try {
			const r = await clienteAxios.get(`/api/tipos-envio`);

			dispatch({
				type: TIPOS_ENVIO,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
			// dispatch({
			// 	type: ERROR_BARRA_HERRAMIENTAS,
			// 	payload: error,
			// });
		}
	};

	const handlePtoVenta = (opt) => {
		dispatch({
			type: PTO_VENTA,
			payload: opt,
		});
	};

	const traerEstadosOrden = async () => {
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

	const handleOpenModalDetalleOrden = () => {
		dispatch({
			type: MODAL_DETALLE_ORDEN,
		});
	};

	const handleCloseModal = () => {
		dispatch({
			type: MODAL_CLOSE,
		});
	};

	const crearYCargarCliente = async (cliente) => {
		try {
			const r = await clienteAxios.post('/api/clientes', cliente);

			console.log(r);
			dispatch({
				type: AGREGAR_CLIENTE,
				payload: r.data,
			});

			mostrarAlertaVentas('Cliente creado', 'success');
		} catch (error) {
			dispatch({
				type: ERROR_PRECIOS,
				payload: error,
			});
		}
	};

	const handleOrdenActiva = (orden) => {
		dispatch({
			type: ACTIVAR_ORDEN,
			payload: orden,
		});
	};

	const handleOrderToModify = (idOrder, cartToEdit) => {
		if (idOrder && cartToEdit) {
			dispatch({
				type: AGREGAR_ORDEN_A_MODIFICAR,
				payload: idOrder,
			});

			dispatch({
				type: CARRITO_RESTAURAR_PRODUCTOS,
				payload: cartToEdit,
			});
		} else {
			dispatch({
				type: ELIMINAR_ORDEN_A_MODIFICAR,
			});

			dispatch({
				type: CARRITO_ELIMINAR,
			});
		}
	};

	const cancelOrderToModify = () => {
		dispatch({
			type: CARRITO_ELIMINAR,
		});

		dispatch({
			type: ELIMINAR_ORDEN_A_MODIFICAR,
		});
	};

	const editProductsOrder = async () => {
		try {
			const r = await clienteAxios.put(
				`/api/detalles-orden/${state.orderToModify}`,
				state.carrito
			);

			dispatch({
				type: CARRITO_ELIMINAR,
			});

			dispatch({
				type: ORDEN_EDITADA,
				payload: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleOrderEdited = (boolean) => {
		dispatch({
			type: ORDEN_EDITADA,
			payload: boolean,
		});
	};

	const mostrarAlertaVentas = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA_VENTAS,
			payload: { msg, categoria },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_VENTAS,
			});
		}, 4000);
	};

	const ocultarAlertaVentas = () => {
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_VENTAS,
			});
		}, 4000);
	};

	return (
		<VentasContext.Provider
			value={{
				preciosPtoStock: state.preciosPtoStock,
				ordenes: state.ordenes,
				ordenCreada: state.ordenCreada,
				ptoStock: state.ptoStock,
				listaPrecio: state.listaPrecio,
				valorRadio: state.valorRadio,
				carrito: state.carrito,
				productoActivoCarrrito: state.productoActivoCarrrito,
				mensaje: state.mensaje,
				mensajeVentas: state.mensajeVentas,
				modo: state.modo,
				orderToModify: state.orderToModify,
				orderEdited: state.orderEdited,
				cliente: state.cliente,
				envio: state.envio,
				nota: state.nota,
				ordenEcommerce: state.ordenEcommerce,
				ptosVenta: state.ptosVenta,
				ptoVenta: state.ptoVenta,
				tiposEnvio: state.tiposEnvio,
				estadosOrden: state.estadosOrden,
				cargando: state.cargando,
				ptosStock: state.ptosStock,
				handlePtoStock,
				handleListaPrecio,
				handleValorRadio,
				handleCarrito,
				restoreCart,
				handleRemoveProductCart,
				handlePriceCart,
				traerProductos,
				handleModo,
				handleCliente,
				handleEnvio,
				crearOrden,
				handleNota,
				handleInputOrdenEcommerce,
				traerPtosStock,
				traerTiposEnvio,
				traerPtosVenta,
				handlePtoVenta,
				traerEstadosOrden,
				handleOpenModalDetalleOrden,
				handleCloseModal,
				crearYCargarCliente,
				handleOrdenActiva,
				handleOrderToModify,
				cancelOrderToModify,
				editProductsOrder,
				handleOrderEdited,
				mostrarAlertaVentas,
				ocultarAlertaVentas,
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
