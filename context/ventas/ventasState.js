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
} from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		preciosStockTotal: [],
		filas: [],
		ptoStock: 1,
		listaPrecio: 1,
		valorRadio: 'pto-stock',
		carrito: [],
		productoActivoCarrito: {},
		ptosStock: null,
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

	const handleModo = (val) => {
		dispatch({
			type: MODO_CARGA_VENTA,
			payload: val,
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
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
