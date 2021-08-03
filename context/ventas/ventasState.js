import React, { useReducer } from 'react';
import VentasContext from './ventasContext';
import VentasReducer from './ventasReducer';
import clienteAxios from '../../config/axios';

import {
	PRODUCTOS_VENTAS,
	FILAS_VENTAS,
	FILAS_ORDENES,
	FILA_ACTIVA_ORDEN,
	PTO_STOCK_VENTAS,
	PTOS_STOCK_VENTAS,
	LISTA_PRECIO_VENTAS,
	VALOR_RADIO_VENTAS,
	CARRITO_AGREGAR_PRODUCTO,
	CARRITO_QUITAR_PRODUCTO,
	CARRITO_MODIFICAR_CANTIDAD,
	CARRITO_MODIFICAR_PRECIO,
	LIMPIAR_CARRITO,
	MODO_CARGA_VENTA,
	AGREGAR_CLIENTE,
	AGREGAR_ENVIO,
	LIMPIAR_CLIENTE,
	AGREGAR_NOTA,
	AGREGAR_ORDEN_ECOMMERCE,
	PTOS_VENTA,
	TIPOS_ENVIO,
	PTO_VENTA,
	CREAR_ORDEN,
	TRAER_ORDENES,
	FILAS_ORDENES_FILTRO,
	TRAER_ESTADOS_ORDEN,
	MODIFICAR_ESTADO_ORDEN,
	BORRAR_MENSAJE,
	MODAL_DETALLE_ORDEN,
	MODAL_CLOSE,
	MOSTRAR_ALERTA_VENTAS,
	OCULTAR_ALERTA_VENTAS,
} from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		preciosStockTotal: [],
		ordenes: [],
		filas: [],
		filasOrdenes: [],
		filaActiva: null,
		ptoStock: { descripcion: 'Showroom', id: 1 }, //
		ptoVenta: null, //
		ordenEcommerce: null, //
		cliente: null, //
		envio: {}, //
		nota: null, //
		listaPrecio: { descripcion: 'Lista Minorista', id: 1 },
		valorRadio: 'pto-stock',
		carrito: [],
		productoActivoCarrito: {},
		ptosStock: null,
		ptosVenta: [],
		tiposEnvio: null,
		estadosOrden: [],
		modo: 'manual',
		openModalDetalleOrden: false,
		cargando: false,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(VentasReducer, initialState);

	// las funciones
	const traerProductos = async (bus) => {
		try {
			let ptoStock = await clienteAxios.get('/api/ventas/pto-stock/');
			let stockTotal = await clienteAxios.get('/api/ventas/total/');

			ptoStock = ptoStock.data;
			stockTotal = stockTotal.data;

			dispatch({
				type: PRODUCTOS_VENTAS,
				payload: { ptoStock, stockTotal, bus },
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

	const handleCarrito = (codigo, ptoStock) => {
		dispatch({
			type: CARRITO_AGREGAR_PRODUCTO,
			payload: { codigo, ptoStock },
		});
	};

	const handleQuitarProductoCarrito = (codigo) => {
		dispatch({
			type: CARRITO_QUITAR_PRODUCTO,
			payload: codigo,
		});
	};

	const handleCantidadCarrito = (codigo, ptoStock, cantidad) => {
		dispatch({
			type: CARRITO_MODIFICAR_CANTIDAD,
			payload: { codigo, ptoStock, cantidad },
		});
	};

	const handlePrecioCarr = (cod, pu) => {
		dispatch({
			type: CARRITO_MODIFICAR_PRECIO,
			payload: { cod, pu },
		});
	};

	const handleFilas = (bus) => {
		dispatch({
			type: FILAS_VENTAS,
			payload: bus,
		});
	};

	const handleFilasOrdenes = () => {
		dispatch({
			type: FILAS_ORDENES,
		});
	};

	const handleFilaActivaOrden = (id) => {
		dispatch({
			type: FILA_ACTIVA_ORDEN,
			payload: id,
		});
	};

	const handleFilasOrdenesFiltro = (bus) => {
		dispatch({
			type: FILAS_ORDENES_FILTRO,
			payload: bus,
		});
	};

	const limpiarCarrito = () => {
		dispatch({
			type: LIMPIAR_CARRITO,
		});
	};

	const limpiarCliente = () => {
		dispatch({
			type: LIMPIAR_CLIENTE,
		});
	};

	const handleModo = (val) => {
		dispatch({
			type: MODO_CARGA_VENTA,
			payload: val,
		});
	};

	const handleCliente = (obj) => {
		dispatch({
			type: AGREGAR_CLIENTE,
			payload: obj,
		});
	};

	const handleEnvio = (obj) => {
		dispatch({
			type: AGREGAR_ENVIO,
			payload: obj,
		});
	};

	const crearOrden = async () => {
		let direccionEnvio;
		if (state.envio.modoDirecc === 'select') {
			direccionEnvio = state.envio.select.descripcion;
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
			let orden = await clienteAxios.post('/api/ordenes/', paraCrearOrden);

			dispatch({
				type: CREAR_ORDEN,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputNota = (val) => {
		dispatch({
			type: AGREGAR_NOTA,
			payload: val,
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

	const traerOrdenes = async () => {
		try {
			let r = await clienteAxios.get('/api/ordenes/');

			dispatch({
				type: TRAER_ORDENES,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
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

	return (
		<VentasContext.Provider
			value={{
				preciosPtoStock: state.preciosPtoStock,
				preciosStockTotal: state.preciosStockTotal,
				ordenes: state.ordenes,
				filas: state.filas,
				filasOrdenes: state.filasOrdenes,
				filaActiva: state.filaActiva,
				ptoStock: state.ptoStock,
				listaPrecio: state.listaPrecio,
				valorRadio: state.valorRadio,
				carrito: state.carrito,
				productoActivoCarrrito: state.productoActivoCarrrito,
				mensaje: state.mensaje,
				modo: state.modo,
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
				handleQuitarProductoCarrito,
				handleCantidadCarrito,
				handlePtosStock,
				handlePrecioCarr,
				traerProductos,
				handleFilas,
				handleFilasOrdenes,
				handleFilasOrdenesFiltro,
				limpiarCarrito,
				handleModo,
				handleCliente,
				handleEnvio,
				limpiarCliente,
				crearOrden,
				handleInputNota,
				handleInputOrdenEcommerce,
				traerTiposEnvio,
				traerPtosVenta,
				handlePtoVenta,
				traerOrdenes,
				traerEstadosOrden,
				handleEstadoOrden,
				handleFilaActivaOrden,
				handleOpenModalDetalleOrden,
				handleCloseModal,
				crearYCargarCliente,
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
