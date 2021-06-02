import {
	PRECIOS_PTO_STOCK,
	PRECIOS_STOCK_TOTAL,
	PRECIOS_PTO_STOCK_FILAS,
	PRECIOS_STOCK_TOTAL_FILAS,
	PRECIOS_PRODUCTOS_SIN_STOCK_FILAS,
	PTO_STOCK_VENTAS,
	LISTA_PRECIO_VENTAS,
	VALOR_RADIO_VENTAS,
	BUSQUEDA_VENTAS,
	CARRITO_AGREGAR_PRODUCTO,
} from '../../types';
import {
	filtraPtoStockListaPrecio,
	filtraStockTotalListaPrecio,
	filtraProductosSinStock,
} from '../../functions/filtroTablas.js';
import { agregarCarrito } from '../../functions/ventas.js';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRECIOS_PTO_STOCK:
			return {
				...state,
				preciosPtoStock: action.payload,
			};
		case PRECIOS_STOCK_TOTAL:
			return {
				...state,
				preciosStockTotal: action.payload,
			};
		case PRECIOS_PTO_STOCK_FILAS:
			const filas = filtraPtoStockListaPrecio(
				state.preciosPtoStock,
				state.ptoStock,
				state.listaPrecio
			);
			return {
				...state,
				filas: filas,
			};
		case PRECIOS_STOCK_TOTAL_FILAS:
			const filasTotal = filtraStockTotalListaPrecio(
				state.preciosStockTotal,
				state.listaPrecio
			);
			return {
				...state,
				filas: filasTotal,
			};
		case PRECIOS_PRODUCTOS_SIN_STOCK_FILAS:
			const filasSinStock = filtraProductosSinStock(
				state.preciosStockTotal,
				state.listaPrecio
			);
			return {
				...state,
				filas: filasSinStock,
			};
		case PTO_STOCK_VENTAS:
			return {
				...state,
				ptoStock: action.payload,
			};
		case LISTA_PRECIO_VENTAS:
			return {
				...state,
				listaPrecio: action.payload,
			};
		case VALOR_RADIO_VENTAS:
			return {
				...state,
				valorRadio: action.payload,
			};
		case BUSQUEDA_VENTAS:
			return {
				...state,
				busqueda: action.payload,
			};
		case CARRITO_AGREGAR_PRODUCTO:
			// funcion que toma codigo, pto de stock, lista precio. Recorre state preciosPtoStock y agrega la fila encontrada al carrito (con cantidad 1)
			const carrito = agregarCarrito(
				action.payload,
				state.ptoStock,
				state.listaPrecio,
				state.preciosPtoStock,
				state.carrito
			);
			localStorage.setItem('carrito', JSON.stringify(carrito));
			return {
				...state,
				carrito: carrito,
			};
		default:
			return state;
	}
};

export default VentasReducer;
