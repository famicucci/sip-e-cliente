import {
	HERRAMIENTAS_PRECIOS,
	HERRAMIENTAS_STOCK_PRODUCTO,
	HERRAMIENTAS_STOCK_PTO_STOCK,
	HERRAMIENTAS_STOCK_MOVIMIENTOS,
	HERRAMIENTAS_NUEVA_VENTA,
	HERRAMIENTAS_EDITAR_VENTAS,
	BUSQUEDA_ACTUAL,
	BUSQUEDA_ACTUAL_CLIENTE,
	PTOS_STOCK,
	LISTAS_PRECIO,
	ERROR_BARRA_HERRAMIENTAS,
} from '../../types';

const PreciosReducer = (state, action) => {
	switch (action.type) {
		case HERRAMIENTAS_PRECIOS:
			return {
				...state,
				buscador: true,
				selectListaPrecio: true,
				selectPtoStock: false,
				botonModoCargaVenta: false,
			};
		case HERRAMIENTAS_STOCK_PRODUCTO:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				botonModoCargaVenta: false,
			};
		case HERRAMIENTAS_STOCK_PTO_STOCK:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: true,
				botonModoCargaVenta: false,
			};
		case HERRAMIENTAS_STOCK_MOVIMIENTOS:
			return {
				...state,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
				botonModoCargaVenta: false,
			};
		case HERRAMIENTAS_NUEVA_VENTA:
			return {
				...state,
				botonModoCargaVenta: true,
				buscador: false,
				selectListaPrecio: false,
				selectPtoStock: false,
			};
		case HERRAMIENTAS_EDITAR_VENTAS:
			return {
				...state,
				botonModoCargaVenta: false,
				buscador: true,
				selectListaPrecio: false,
				selectPtoStock: false,
			};
		case BUSQUEDA_ACTUAL:
			return {
				...state,
				busqueda: action.payload,
			};
		case BUSQUEDA_ACTUAL_CLIENTE:
			return {
				...state,
				busquedaCliente: action.payload,
			};
		case PTOS_STOCK:
			return {
				...state,
				ptosStock: action.payload,
			};
		case LISTAS_PRECIO:
			return {
				...state,
				listasPrecio: action.payload,
			};
		case ERROR_BARRA_HERRAMIENTAS:
			return {
				...state,
				mensaje: action.payload,
			};

		default:
			return state;
	}
};

export default PreciosReducer;
