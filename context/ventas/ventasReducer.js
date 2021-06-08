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
	CARRITO_MODIFICAR_CANTIDAD,
} from '../../types';
import {
	filtraPtoStockListaPrecio,
	filtraStockTotalListaPrecio,
	filtraProductosSinStock,
} from '../../functions/filtroTablas.js';
import { filtraProducto } from '../../functions/filtroTablas.js';
import {
	agregarCarrito,
	modCantStock,
	quitarProductoCarrito,
} from '../../functions/ventas.js';

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
			const carrito = agregarCarrito(
				action.payload.codigo,
				action.payload.ptoStock,
				state.listaPrecio,
				state.preciosStockTotal,
				state.carrito
			);
			const stockModificado = modCantStock(
				action.payload.codigo,
				action.payload.ptoStock,
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
			let producto = filtraProducto(state.carrito, action.payload);
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
					const stockModificado = modCantStock(
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
		case CARRITO_MODIFICAR_CANTIDAD:
			// carrito = modCantProdCarr(
			// 	state.carrito,
			// 	action.payload.codigo,
			// 	action.payload.ptoStock,
			// 	action.payload.cantidad,
			// 	state.preciosPtoStock,
			// 	state.listaPrecio
			// );
			return {
				...state,
				carrito: carrito,
			};
		default:
			return state;
	}
};

export default VentasReducer;
