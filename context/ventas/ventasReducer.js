import {
	PRODUCTOS_VENTAS,
	FILAS_VENTAS,
	PTO_STOCK_VENTAS,
	PTOS_STOCK_VENTAS,
	LISTA_PRECIO_VENTAS,
	VALOR_RADIO_VENTAS,
	CARRITO_AGREGAR_PRODUCTO,
	CARRITO_PRODUCTO_ACTIVO,
	CARRITO_QUITAR_PRODUCTO,
	CARRITO_MODIFICAR_CANTIDAD,
	CARRITO_MODIFICAR_PRECIO,
} from '../../types';
import {
	filtraProducto,
	detArrayPrecios,
	filtro,
} from '../../functions/filtroTablas.js';
import {
	agregarCarrito,
	modCantStock,
	quitarProductoCarrito,
	modProdCarr,
	modPrecioCarr,
} from '../../functions/ventas.js';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRODUCTOS_VENTAS:
			let arrayProd = detArrayPrecios(
				action.payload.ptoStock,
				action.payload.stockTotal,
				state.valorRadio
			);
			let r = filtro(arrayProd, {
				lisPre: state.listaPrecio,
				ptoStock: state.ptoStock,
			});
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
		default:
			return state;
	}
};

export default VentasReducer;
