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
	STOCK_MODIFICAR_CANTIDAD,
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
import { detArrayPrecios, filtro, filBus } from '../../functions/filtros.js';
import {
	quitarProductoCarrito,
	modProdCarr,
	modPrecioCarr,
	modificarCantMultiplesStocks,
	limpiarCarr,
	prodCarr,
	llenarCarr,
} from '../../functions/ventas.js';
import {
	crearFilasTablaEditarOrdenes,
	modEstadoOrden,
} from '../../functions/editarordenes';

const VentasReducer = (state, action) => {
	switch (action.type) {
		case PRODUCTOS_VENTAS:
			// let arrayProd = detArrayPrecios(
			// 	action.payload.ptoStock,
			// 	action.payload.stockTotal,
			// 	state.valorRadio
			// );
			// let vars = {
			// 	lisPre: state.listaPrecio.id,
			// 	ptoStock: state.ptoStock.id,
			// 	bus: action.payload.bus,
			// };
			// let r = filtro(arrayProd, vars);
			// let carr = state.carrito;
			// let arrayPtoStock = action.payload.ptoStock;
			// let arrayStockTotal = action.payload.stockTotal;

			// let r2;
			// if (localStorage.getItem('carrito')) {
			// 	carr = JSON.parse(localStorage.getItem('carrito'));
			// 	r2 = llenarCarr(carr, arrayPtoStock, arrayStockTotal);
			// 	carr = r2.carr;
			// 	arrayPtoStock = r2.arrayPtoStock;
			// 	arrayStockTotal = r2.arrayStockTotal;
			// }

			// falta tomar accion en la func llenarCarrito cuando un producto ya no está en stock
			return {
				...state,
				preciosPtoStock: action.payload,
				// preciosStockTotal: arrayStockTotal,
				// carrito: carr,
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
			// localStorage.setItem('carrito', JSON.stringify(r.carr));
			return {
				...state,
				carrito: [...state.carrito, action.payload],
			};

		case STOCK_MODIFICAR_CANTIDAD:
			return {
				...state,
				preciosPtoStock: state.preciosPtoStock.map((x) =>
					x.ProductoCodigo === action.payload.ProductoCodigo &&
					x.PtoStockId === action.payload.PtoStockId
						? { ...x, cantidad: x.cantidad + action.payload.qty }
						: x
				),
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
			// localStorage.setItem('carrito', JSON.stringify(r.carrMod));
			return {
				...state,
				carrito: state.carrito.map((x) =>
					x.ProductoCodigo === action.payload.ProductoCodigo &&
					x.PtoStockId === action.payload.PtoStockId
						? action.payload
						: x
				),
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

		case CARRITO_AGREGAR_PRODUCTOS:
			console.log(action.payload);
			return {
				...state,
				carrito: action.payload,
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
		case AGREGAR_ENVIO:
			return {
				...state,
				envio: action.payload,
			};
		case LIMPIAR_CLIENTE:
			return {
				...state,
				cliente: null,
			};
		case AGREGAR_NOTA:
			return {
				...state,
				nota: action.payload,
			};
		case AGREGAR_ORDEN_ECOMMERCE:
			return {
				...state,
				ordenEcommerce: action.payload,
			};
		case PTOS_VENTA:
			return {
				...state,
				ptosVenta: action.payload,
			};
		case PTO_VENTA:
			return {
				...state,
				ptoVenta: action.payload,
			};
		case TIPOS_ENVIO:
			return {
				...state,
				tiposEnvio: action.payload,
			};
		case TRAER_ESTADOS_ORDEN:
			return {
				...state,
				estadosOrden: action.payload,
			};
		case MODIFICAR_ESTADO_ORDEN:
			const ordenModificadas = modEstadoOrden(
				state.ordenes,
				action.payload.orden,
				action.payload.value,
				action.payload.descripcion
			);
			console.log(action.payload.r);
			return {
				...state,
				mensaje: action.payload.r,
			};
		case ACTIVAR_ORDEN:
			return {
				...state,
				ordenCreada: action.payload,
			};
		case AGREGAR_ORDEN_A_MODIFICAR:
			return {
				...state,
				orderToModify: action.payload,
			};
		case BORRAR_MENSAJE:
			return {
				...state,
				mensaje: null,
			};
		case MODAL_DETALLE_ORDEN:
			return {
				...state,
				openModalDetalleOrden: true,
			};
		case MODAL_CLOSE:
			return {
				...state,
				openModalDetalleOrden: false,
			};
		case MOSTRAR_ALERTA_VENTAS:
			return {
				...state,
				mensajeVentas: action.payload,
			};
		case OCULTAR_ALERTA_VENTAS:
			return {
				...state,
				mensajeVentas: null,
			};
		default:
			return state;
	}
};

export default VentasReducer;
