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
	LIMPIAR_CLIENTE,
} from '../../types';
import { detArrayPrecios, filtro } from '../../functions/filtros.js';
import {
	quitarProductoCarrito,
	modProdCarr,
	modPrecioCarr,
	modificarCantMultiplesStocks,
	limpiarCarr,
	prodCarr,
	llenarCarr,
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
				lisPre: state.listaPrecio.id,
				ptoStock: state.ptoStock.id,
				bus: action.payload.bus,
			};
			let r = filtro(arrayProd, vars);
			let carr = state.carrito;
			let arrayPtoStock = action.payload.ptoStock;
			let arrayStockTotal = action.payload.stockTotal;

			let r2;
			if (localStorage.getItem('carrito')) {
				carr = JSON.parse(localStorage.getItem('carrito'));
				r2 = llenarCarr(carr, arrayPtoStock, arrayStockTotal);
				carr = r2.carr;
				arrayPtoStock = r2.arrayPtoStock;
				arrayStockTotal = r2.arrayStockTotal;
			}

			// falta tomar accion en la func llenarCarrito cuando un producto ya no está en stock
			return {
				...state,
				preciosPtoStock: arrayPtoStock,
				preciosStockTotal: arrayStockTotal,
				filas: r,
				carrito: carr,
			};
		case FILAS_VENTAS:
			arrayProd = detArrayPrecios(
				state.preciosPtoStock,
				state.preciosStockTotal,
				state.valorRadio
			);
			r = filtro(arrayProd, {
				lisPre: state.listaPrecio.id,
				ptoStock: state.ptoStock.id,
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
			r = prodCarr(
				action.payload.codigo,
				action.payload.ptoStock,
				state.listaPrecio.id,
				state.modo,
				state.ptosStock,
				state.preciosPtoStock,
				state.preciosStockTotal,
				state.carrito
			);

			localStorage.setItem('carrito', JSON.stringify(r.carr));

			return {
				...state,
				preciosPtoStock: r.arrayPtoStock,
				preciosStockTotal: r.arrayStockTotal,
				carrito: r.carr,
				mensaje: r.msg,
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

			localStorage.setItem('carrito', JSON.stringify(resultado.carr));
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
			localStorage.setItem('carrito', JSON.stringify(r.carrMod));
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
		case AGREGAR_CLIENTE:
			return {
				...state,
				cliente: action.payload,
			};
		case LIMPIAR_CLIENTE:
			return {
				...state,
				cliente: null,
			};

		default:
			return state;
	}
};

export default VentasReducer;
