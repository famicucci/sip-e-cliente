import {
	TRAER_ORDENES,
	TRAER_ESTADOS_ORDEN,
	FILAS_ORDENES,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ESTADO_ORDEN,
	MODIFICAR_ORDEN,
	MODAL_DETALLE_ORDEN,
	MODAL_CLOSE,
	BORRAR_MENSAJE,
	TIPOS_ENVIO,
} from '../../../types';
import { filBus } from '../../../functions/filtros.js';
import {
	crearFilasTablaEditarOrdenes,
	modEstadoOrden,
	Ordenes,
	Orden,
} from '../../../functions/editarordenes';

const EditarOrdenesReducer = (state, action) => {
	switch (action.type) {
		case TRAER_ORDENES:
			let r = crearFilasTablaEditarOrdenes(action.payload);
			return {
				...state,
				ordenes: action.payload,
				filasOrdenes: r,
				filas: r,
				cargando: false,
			};
		case TRAER_ESTADOS_ORDEN:
			return {
				...state,
				estadosOrden: action.payload,
			};
		case FILAS_ORDENES:
			r = crearFilasTablaEditarOrdenes(state.ordenes);
			return {
				...state,
				filasOrdenes: r,
				filas: r,
			};
		case FILA_ACTIVA_ORDEN:
			r = state.ordenes.find((x) => x.id === action.payload);
			return {
				...state,
				filaActiva: r,
			};

		case MODIFICAR_ORDEN:
			const orden = new Orden(
				state.filaActiva,
				action.payload.ordenObj,
				state.tiposEnvio
			);
			const ordenMod = orden.modificarOrden();

			const ordenes = new Ordenes(state.ordenes, ordenMod);
			const ordenesMod = ordenes.modOrdenes();

			return {
				...state,
				ordenes: ordenesMod,
				filaActiva: ordenMod,
				mensaje: action.payload.r,
			};
		case MODIFICAR_ESTADO_ORDEN:
			const ordenModificadas = modEstadoOrden(
				state.ordenes,
				action.payload.orden,
				action.payload.value,
				action.payload.descripcion
			);
			return {
				...state,
				ordenes: ordenModificadas,
				mensaje: action.payload.r,
			};
		case MODAL_DETALLE_ORDEN:
			return {
				...state,
				openModalDetalleOrden: true,
			};
		case MODAL_CLOSE:
			return {
				...state,
				filaActiva: {},
				openModalDetalleOrden: false,
			};
		case BORRAR_MENSAJE:
			return {
				...state,
				mensaje: null,
			};
		case TIPOS_ENVIO:
			return {
				...state,
				tiposEnvio: action.payload,
			};
		default:
			return state;
	}
};

export default EditarOrdenesReducer;
