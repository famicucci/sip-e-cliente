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
import { detArrayPrecios, filtro } from '../../functions/filtros.js';
import {
	agregarCarrito,
	modCantStock,
	quitarProductoCarrito,
	modProdCarr,
	modPrecioCarr,
	modificarCantMultiplesStocks,
	limpiarCarr,
} from '../../functions/ventas.js';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRODUCTOS_VENTAS:
			let arrayProd = detArrayPrecios(
				action.payload.ptoStock,
				action.payload.stockTotal,
				state.valorRadio
			);
			let vars = {
				lisPre: state.listaPrecio,
				ptoStock: state.ptoStock,
				bus: action.payload.bus,
			};
			let r = filtro(arrayProd, vars);
			return {
				...state,
				preciosPtoStock: action.payload.ptoStock,
				preciosStockTotal: action.payload.stockTotal,
				filas: r,
			};
		case FILAS_VENTAS:
			arrayProd = detArrayPrecios(
				state.preciosPtoStock,
				state.preciosStockTotal,
				state.valorRadio
			);
			r = filtro(arrayProd, {
				lisPre: state.listaPrecio,
				ptoStock: state.ptoStock,
				bus: action.payload,
			});
			return {
				...state,
				filas: r,
			};
		case PTO_STOCK_VENTAS:
			return {
				...state,
				ptoStock: action.payload,
			};
		case PTOS_STOCK_VENTAS:
			return {
				...state,
				ptosStock: action.payload,
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
		case CARRITO_AGREGAR_PRODUCTO:
			const carrito = agregarCarrito(
				action.payload.codigo,
				action.payload.ptoStock,
				state.ptosStock,
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
		case CARRITO_QUITAR_PRODUCTO:
			let resultado = quitarProductoCarrito(state.carrito, action.payload);

			const arrayOrigen = resultado.prod.origen;

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
				carrito: resultado.carr,
			};
		case LIMPIAR_CARRITO:
			r = limpiarCarr(
				state.carrito,
				state.preciosPtoStock,
				state.preciosStockTotal
			);
			localStorage.setItem('carrito', JSON.stringify(r.carr));
			return {
				...state,
				preciosPtoStock: r.arrayPtoStock,
				preciosStockTotal: r.arrayStockTot,
				carrito: r.carr,
			};
		case CARRITO_MODIFICAR_CANTIDAD:
			r = modProdCarr(
				state.carrito,
				action.payload.codigo,
				action.payload.ptoStock,
				action.payload.cantidad,
				state.preciosPtoStock,
				state.preciosStockTotal
			);

			return {
				...state,
				carrito: r.carrMod,
				preciosPtoStock: r.ptoStockMod,
				preciosStockTotal: r.stockTotalMod,
				mensaje: r.msg,
			};
		case CARRITO_MODIFICAR_PRECIO:
			const puMod = modPrecioCarr(
				action.payload.cod,
				action.payload.pu,
				state.carrito
			);
			return {
				...state,
				carrito: puMod,
			};
		case MODO_CARGA_VENTA:
			return {
				...state,
				modo: action.payload,
			};
		default:
			return state;
	}
};

export default VentasReducer;
