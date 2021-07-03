import React, { useReducer } from 'react';
import VentasContext from './ventasContext';
import VentasReducer from './ventasReducer';
import clienteAxios from '../../config/axios';

import {
	PRODUCTOS_VENTAS,
	FILAS_VENTAS,
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
} from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		preciosStockTotal: [],
		filas: [],
		ptoStock: { descripcion: 'Showroom', id: 1 },
		ptoVenta: 1,
		listaPrecio: { descripcion: 'Lista Minorista', id: 1 },
		valorRadio: 'pto-stock',
		carrito: [],
		productoActivoCarrito: {},
		cliente: null,
		envio: {
			modoDirecc: 'select',
			input: { direccion: '' },
			select: { id: null, direccion: '' },
			tipo: 1, // esto lo tengo que setear apenas me traigo los tipos de envio de la bd
			costo: 0,
		},
		ptosStock: null,
		ptosVenta: 1,
		tiposEnvio: null,
		nota: null,
		ordenEcommerce: null,
		modo: 'manual',
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
			OrdenEstadoId: 1, // va en automático
			detalleOrden: detalleOrden,
		};

		console.log(paraCrearOrden);

		return;
		try {
			let orden = await clienteAxios.post('/api/ordenes/', paraCrearOrden);

			console.log(orden);
			// dispatch({
			// 	type: PRODUCTOS_VENTAS,
			// 	payload: { ptoStock, stockTotal, bus },
			// });
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

	return (
		<VentasContext.Provider
			value={{
				preciosPtoStock: state.preciosPtoStock,
				preciosStockTotal: state.preciosStockTotal,
				filas: state.filas,
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
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
