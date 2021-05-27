import {
	PTO_STOCK,
	TRAER_STOCK_PRODUCTO,
	FILAS_BUSQUEDA,
	FILAS_PTO_STOCK,
	PRODUCTO_ACTIVO,
	ACTIVAR_FILA,
	CONFIRMAR_CAMBIO_STOCK,
	NUEVA_CANTIDAD_STOCK,
	MODAL_OPEN,
	MODAL_CLOSE,
	ERROR_STOCK,
} from '../../types';
import { filtrado, filtraPuntoStock } from '../../functions/filtroTablas.js';

const StockReducer = (state, action) => {
	switch (action.type) {
		case PTO_STOCK:
			return {
				...state,
				ptoStock: action.payload,
			};
		case TRAER_STOCK_PRODUCTO:
			return {
				...state,
				stocks: action.payload,
			};
		case FILAS_BUSQUEDA:
			return {
				...state,
				filas: filtrado(action.payload.stocks, action.payload.busqueda),
			};
		case PRODUCTO_ACTIVO:
			return {
				...state,
				productoActivo: action.payload,
			};
		case ACTIVAR_FILA:
			return {
				...state,
				filaActivaProducto: action.payload,
			};
		case CONFIRMAR_CAMBIO_STOCK:
			return {
				...state,
				productoActivo: state.productoActivo.map((fila) =>
					fila.id === action.payload.fila.id ? action.payload.fila : fila
				),
				filaActivaProducto: {},
				mensaje: {
					msg: action.payload.respuesta.data.msg,
					categoria: 'success',
				},
			};
		case NUEVA_CANTIDAD_STOCK:
			return {
				...state,
				filaActivaProducto: {
					...state.filaActivaProducto,
					cantidad: action.payload,
				},
			};
		case FILAS_PTO_STOCK:
			return {
				...state,
				filas: filtraPuntoStock(action.payload.stocks, action.payload.ptoStock),
			};
		case MODAL_OPEN:
			return {
				...state,
				openModal: true,
			};
		case MODAL_CLOSE:
			const cantTotalProducto = (arrayProducto) => {
				let cantidades = [];
				arrayProducto.map((fila) => cantidades.push(parseInt(fila.cantidad)));

				var total = cantidades.reduce(function (previo, actual) {
					return previo + actual;
				}, 0);
				return total;
			};

			const cantTotal = cantTotalProducto(state.productoActivo);
			const codigoProducto = state.productoActivo[0]['ProductoCodigo'];

			return {
				...state,
				stocks: state.stocks.map((fila) =>
					fila.ProductoCodigo === codigoProducto
						? { ...fila, cantidad: cantTotal }
						: { ...fila }
				),
				productoActivo: {},
				openModal: false,
			};
		case ERROR_STOCK:
			return {
				...state,
				mensaje: action.payload,
			};
		default:
			return state;
	}
};

export default StockReducer;
