import {
	TRAER_ORDENES,
	ELIMINAR_ORDEN,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ESTADO_ORDEN,
	MODIFICAR_ORDENES,
	CREAR_DETALLE_FACTURA,
	CREAR_FACTURA,
	MODAL_DETALLE_ORDEN,
	MODAL_INFORMACION_CLIENTE,
	MODAL_CREAR_FACTURA,
	MODAL_FACTURA,
	MODAL_CONFIRMAR_FACTURA,
	MODAL_CREAR_PAGO,
	MODAL_CLOSE,
	MODAL_CLOSE_CONFIRMAR_FACTURA,
	MODAL_CLOSE_CREAR_PAGO,
	PTOS_VENTA,
	ACTUALIZAR_PAGO,
	MOSTRAR_ALERTA_EDITAR_ORDENES,
	OCULTAR_ALERTA_EDITAR_ORDENES,
	ACTIVAR_ORDEN,
} from '../../../types';

const EditarOrdenesReducer = (state, action) => {
	switch (action.type) {
		case TRAER_ORDENES:
			return {
				...state,
				ordenes: action.payload.respuesta,
				cargando: false,
			};
		case ELIMINAR_ORDEN:
			return {
				...state,
				ordenes: state.ordenes.filter((x) => x.id !== action.payload),
			};
		case FILA_ACTIVA_ORDEN:
			return {
				...state,
				filaActiva: action.payload,
			};
		case ACTIVAR_ORDEN:
			return {
				...state,
				filaActiva: state.ordenes.find((x) => x.id === action.payload),
			};
		case MODIFICAR_ORDENES:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === action.payload.id ? action.payload : x
				),
			};
		case MODIFICAR_ESTADO_ORDEN:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === action.payload.idOrder
						? {
								...x,
								OrdenEstado: {
									id: action.payload.idStatus,
									descripcion: action.payload.descriptionStatus,
								},
						  }
						: x
				),
			};
		case CREAR_DETALLE_FACTURA:
			return {
				...state,
				factura: { ...state.factura, detalleFactura: action.payload },
			};
		case CREAR_FACTURA:
			// me llega la nueva factura
			// reemplazar la factura en ordenActiva
			const nuevaOrdenActiva = {
				...state.filaActiva,
				Factura: { ...action.payload },
			};

			const ordenesMod = state.ordenes.map((x) =>
				x.id === nuevaOrdenActiva.id ? nuevaOrdenActiva : x
			);

			return {
				...state,
				filaActiva: nuevaOrdenActiva,
				ordenes: ordenesMod,
			};

		case MODAL_DETALLE_ORDEN:
			return {
				...state,
				openModalDetalleOrden: true,
			};
		case MODAL_INFORMACION_CLIENTE:
			return {
				...state,
				openModalInformacionCliente: true,
			};
		case MODAL_CREAR_FACTURA:
			return {
				...state,
				openModalCrearFactura: true,
			};
		case MODAL_FACTURA:
			return {
				...state,
				openModalFactura: true,
			};

		case MODAL_CONFIRMAR_FACTURA:
			return {
				...state,
				openModalConfirmarCrearFactura: true,
			};
		case MODAL_CREAR_PAGO:
			return {
				...state,
				openModalCrearPago: true,
			};

		case MODAL_CLOSE:
			return {
				...state,
				// filaActiva: {},
				factura: {},
				openModalDetalleOrden: false,
				openModalInformacionCliente: false,
				openModalCrearFactura: false,
				openModalFactura: false,
				openModalConfirmarCrearFactura: false,
			};
		case MODAL_CLOSE_CONFIRMAR_FACTURA:
			return {
				...state,
				openModalConfirmarCrearFactura: false,
			};
		case MODAL_CLOSE_CREAR_PAGO:
			return {
				...state,
				openModalCrearPago: false,
			};
		case PTOS_VENTA:
			return {
				...state,
				ptosVenta: action.payload,
			};
		case ACTUALIZAR_PAGO:
			return {
				...state,
				ordenes: state.ordenes.map((x) =>
					x.id === state.filaActiva.id
						? {
								...x,
								Factura: {
									...x.Factura,
									Pagos: [...x.Factura.Pagos, action.payload],
								},
						  }
						: x
				),
			};
		case MOSTRAR_ALERTA_EDITAR_ORDENES:
			return {
				...state,
				mensajeEditarOrdenes: action.payload,
			};
		case OCULTAR_ALERTA_EDITAR_ORDENES:
			return {
				...state,
				mensajeEditarOrdenes: null,
			};

		default:
			return state;
	}
};

export default EditarOrdenesReducer;
