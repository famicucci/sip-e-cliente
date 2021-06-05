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
	CARRITO_PRODUCTO_ACTIVO,
	CARRITO_QUITAR_PRODUCTO,
} from '../../types';
import {
	filtraPtoStockListaPrecio,
	filtraStockTotalListaPrecio,
	filtraProductosSinStock,
} from '../../functions/filtroTablas.js';
import {
	agregarCarrito,
	restaCantidadEnStock,
	quitarProductoCarrito,
} from '../../functions/ventas.js';
import { filtraProducto } from '../../functions/filtroTablas.js';

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
			let carrito = agregarCarrito(
				action.payload,
				state.ptoStock,
				state.listaPrecio,
				state.preciosPtoStock,
				state.carrito
			);
			const stockModificado = restaCantidadEnStock(
				action.payload,
				state.ptoStock,
				state.preciosPtoStock,
				state.preciosStockTotal,
				-1
			);
			localStorage.setItem('carrito', JSON.stringify(carrito));

			return {
				...state,
				preciosPtoStock: stockModificado.ptoStock,
				preciosStockTotal: stockModificado.stockTotal,
				carrito: carrito,
			};
		case CARRITO_PRODUCTO_ACTIVO:
			const producto = filtraProducto(state.carrito, action.payload);
			return {
				...state,
				productoActivoCarrito: producto,
			};
		case CARRITO_QUITAR_PRODUCTO:
			const resultado = quitarProductoCarrito(state.carrito, action.payload);

			const arrayOrigen = resultado.producto.origen;

			const modificarCantMultiplesStocks = (
				codigo,
				arrayOrigen,
				ptoStock,
				stockTotal
			) => {
				let filasPtoStock = ptoStock;
				let filasStockTotal = stockTotal;

				for (let i = 0; i < arrayOrigen.length; i++) {
					console.log(arrayOrigen[i]['ptoStockId']);
					const stockModificado = restaCantidadEnStock(
						codigo,
						arrayOrigen[i]['ptoStockId'],
						filasPtoStock,
						filasStockTotal,
						arrayOrigen[i]['cantidad']
					);

					filasPtoStock = stockModificado.ptoStock;
					filasStockTotal = stockModificado.stockTotal;
				}

				return { filasPtoStock, filasStockTotal };
			};

			const stocksModificados = modificarCantMultiplesStocks(
				action.payload,
				arrayOrigen,
				state.preciosPtoStock,
				state.preciosStockTotal
			);

			localStorage.setItem('carrito', JSON.stringify(carrito));
			return {
				...state,
				preciosPtoStock: stocksModificados.filasPtoStock,
				preciosStockTotal: stocksModificados.filasStockTotal,
				carrito: resultado.carrito,
			};
		default:
			return state;
	}
};

export default VentasReducer;
