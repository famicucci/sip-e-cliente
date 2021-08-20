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
	CARRITO_AGREGAR_PRODUCTOS,
	CARRITO_RESTAURAR_PRODUCTOS,
	STOCK_MODIFICAR_CANTIDAD,
	LIMPIAR_CARRITO,
	MODO_CARGA_VENTA,
	AGREGAR_CLIENTE,
	AGREGAR_ENVIO,
	AGREGAR_NOTA,
	AGREGAR_ORDEN_ECOMMERCE,
	PTOS_VENTA,
	TIPOS_ENVIO,
	PTO_VENTA,
	TRAER_ESTADOS_ORDEN,
	MODIFICAR_ESTADO_ORDEN,
	AGREGAR_ORDEN_A_MODIFICAR,
	BORRAR_MENSAJE,
	MODAL_DETALLE_ORDEN,
	MODAL_CLOSE,
	MOSTRAR_ALERTA_VENTAS,
	OCULTAR_ALERTA_VENTAS,
	ACTIVAR_ORDEN,
} from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		preciosStockTotal: [],
		ordenCreada: null,
		ptoStock: { descripcion: 'Showroom', id: 1 },
		ptoVenta: null,
		ordenEcommerce: null,
		cliente: null,
		envio: {},
		nota: null,
		listaPrecio: { descripcion: 'Lista Minorista', id: 1 },
		valorRadio: 'pto-stock',
		carrito: [],
		productoActivoCarrito: {},
		ptosStock: null,
		ptosVenta: [],
		tiposEnvio: null,
		estadosOrden: [],
		modo: 'manual',
		orderToModify: null,
		openModalDetalleOrden: false,
		cargando: false,
		mensaje: null,
		mensajeVentas: null,
	};

	const [state, dispatch] = useReducer(VentasReducer, initialState);

	// las funciones
	const traerProductos = async (bus) => {
		try {
			let ptoStock = await clienteAxios.get('/api/ventas/pto-stock/');
			// let stockTotal = await clienteAxios.get('/api/ventas/total/');
			// console.log(stockTotal);
			// console.log(ptoStock);

			// dispatch({
			// 	type: PRODUCTOS_VENTAS,
			// 	payload: { ptoStock, bus },
			// });
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

	const handlePtosStock = (ptosStock) => {
		dispatch({
			type: PTOS_STOCK_VENTAS,
			payload: ptosStock,
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

	const handleCliente = (obj) => {
		localStorage.setItem('cliente', JSON.stringify(obj));
		dispatch({
			type: AGREGAR_CLIENTE,
			payload: obj,
		});
	};

	const handleEnvio = (obj) => {
		localStorage.setItem('envio', JSON.stringify(obj));
		dispatch({
			type: AGREGAR_ENVIO,
			payload: obj,
		});
	};

	const crearOrden = async () => {
		let direccionEnvio;
		if (state.envio.modoDirecc === 'select' && state.envio.select) {
			direccionEnvio = Direccion.transformDirection(state.envio.select);
		} else if (state.envio.modoDirecc === 'input') {
			direccionEnvio = state.envio.input;
		}

		// procesar los productos del carrito
		let detalleOrden = [];
		let OrdenEstadoId = 2;
		for (let i = 0; i < state.carrito.length; i++) {
			const a = state.carrito[i];
			const codigo = a.codigo;
			const pu = a.pu;
			for (let k = 0; k < a.origen.length; k++) {
				const b = a.origen[k];
				let ptoStockId = b.ptoStockId;
				const cantidad = b.cantidad;

				let origen;
				if (ptoStockId === 0) {
					ptoStockId = null;
					origen = 'Producción';
					if (cantidad !== 0) {
						OrdenEstadoId = 1;
					}
				} else {
					origen = 'Disponible';
				}

				const obj = {
					cantidad: cantidad,
					pu: pu,
					origen: origen,
					ProductoCodigo: codigo,
					PtoStockId: ptoStockId,
				};
				detalleOrden.push(obj);
			}
		}

		// validar los campos null
		// conectar con la bd y crear la orden
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

			try {
				const createdOrder = await clienteAxios.get(
					`/api/ordenes/${order.data.id}`
				);

				dispatch({
					type: ACTIVAR_ORDEN,
					payload: createdOrder.data,
				});

				localStorage.removeItem('carrito');
				localStorage.removeItem('envio');
				localStorage.removeItem('cliente');
				localStorage.removeItem('nota');
				localStorage.removeItem('ordenEcommerce');
				localStorage.removeItem('ptoVenta');
			} catch (error) {
				mostrarAlertaVentas('Hubo un error', 'error');
			}
		} catch (error) {
			mostrarAlertaVentas('Hubo un error al crear la orden', 'error');
		}
	};

	const handleInputNota = (val) => {
		localStorage.setItem('nota', JSON.stringify(val));
		dispatch({
			type: AGREGAR_NOTA,
			payload: val,
		});
	};

	const handleInputOrdenEcommerce = (val) => {
		localStorage.setItem('ordenEcommerce', JSON.stringify(val));
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
		localStorage.setItem('ptoVenta', JSON.stringify(opt));
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

	const handleEstadoOrden = async (orden, value, descripcion) => {
		const datos = {
			OrdenEstadoId: value,
		};

		try {
			let r = await clienteAxios.put(`/api/ordenes/${orden}`, datos);

			dispatch({
				type: MODIFICAR_ESTADO_ORDEN,
				payload: {
					r: r.data,
					orden: orden,
					value: value,
					descripcion: descripcion,
				},
			});
		} catch (error) {
			console.log(error);
		}

		dispatch({
			type: BORRAR_MENSAJE,
		});
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

	const handleOrderToModify = (orden) => {
		dispatch({
			type: AGREGAR_ORDEN_A_MODIFICAR,
			payload: orden,
		});

		let initialArray = orden.detalleOrden;

		const initialArrayMod = initialArray.map((x) => {
			const productCart = {
				codigo: x.ProductoCodigo,
				descripcion: x.Producto.descripcion,
				pu: x.pu,
				cantidad: x.cantidad,
				origen: [
					{
						ptoStockId: x.PtoStock ? x.PtoStock.id : 0,
						ptoStockDescripcion: x.PtoStock
							? x.PtoStock.descripcion
							: 'Producción',
						cantidad: x.cantidad,
					},
				],
			};

			return productCart;
		});

		let arrayCart = [];

		initialArrayMod.forEach((x) => {
			let elementCart = arrayCart.find((k) => k.codigo === x.codigo);
			if (!elementCart) {
				arrayCart = [...arrayCart, x];
			} else {
				const origenElementCart = elementCart.origen;
				const origenElementArrayMod = x.origen;

				const newOrigen = [...origenElementCart, ...origenElementArrayMod];
				elementCart = { ...elementCart, origen: newOrigen };
				arrayCart = arrayCart.map((j) =>
					j.codigo === elementCart.codigo ? elementCart : j
				);
			}
		});

		localStorage.setItem('carrito', JSON.stringify(arrayCart));

		dispatch({
			type: CARRITO_AGREGAR_PRODUCTOS,
			payload: arrayCart,
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
				preciosStockTotal: state.preciosStockTotal,
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
				cliente: state.cliente,
				envio: state.envio,
				nota: state.nota,
				ordenEcommerce: state.ordenEcommerce,
				ptosVenta: state.ptosVenta,
				ptoVenta: state.ptoVenta,
				tiposEnvio: state.tiposEnvio,
				estadosOrden: state.estadosOrden,
				cargando: state.cargando,
				openModalDetalleOrden: state.openModalDetalleOrden,
				handlePtoStock,
				handleListaPrecio,
				handleValorRadio,
				handleCarrito,
				restoreCart,
				handleRemoveProductCart,
				handlePtosStock,
				handlePriceCart,
				traerProductos,
				handleModo,
				handleCliente,
				handleEnvio,
				crearOrden,
				handleInputNota,
				handleInputOrdenEcommerce,
				traerTiposEnvio,
				traerPtosVenta,
				handlePtoVenta,
				traerEstadosOrden,
				handleEstadoOrden,
				handleOpenModalDetalleOrden,
				handleCloseModal,
				crearYCargarCliente,
				handleOrdenActiva,
				handleOrderToModify,
				mostrarAlertaVentas,
				ocultarAlertaVentas,
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
