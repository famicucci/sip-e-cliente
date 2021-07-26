import {
	TRAER_ORDENES,
	TRAER_ESTADOS_ORDEN,
	FILAS_ORDENES,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ESTADO_ORDEN,
	MODIFICAR_ORDEN,
	MODIFICAR_FACTURA,
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
	BORRAR_MENSAJE,
	TIPOS_ENVIO,
	PTOS_VENTA,
	METODOS_PAGO,
	CREAR_PAGO,
} from '../../../types';
import { filBus, Filtro } from '../../../functions/filtros.js';
import {
	crearFilasTablaEditarOrdenes,
	modEstadoOrden,
	Ordenes,
	Orden,
} from '../../../functions/editarordenes';
import { ModificarArray } from '../../../hooks/General';

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
			let orden = new OrdenOld(
				state.filaActiva,
				action.payload.ordenObj,
				state.tiposEnvio,
				state.ptosVenta
			);
			const ordenMod = orden.modificarOrden();

			let ordenes = new Ordenes(state.ordenes, ordenMod);
			let ordenesMod = ordenes.modOrdenes();

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
		case MODIFICAR_FACTURA:
			return {
				...state,
				factura: { ...state.factura, ...action.payload },
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
				Facturas: [{ ...action.payload }],
			};

			ordenesMod = state.ordenes.map((x) =>
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
				filaActiva: {},
				factura: {},
				openModalDetalleOrden: false,
				openModalInformacionCliente: false,
				openModalCrearFactura: false,
				openModalFactura: false,
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
		case PTOS_VENTA:
			return {
				...state,
				ptosVenta: action.payload,
			};
		case METODOS_PAGO:
			return {
				...state,
				metodosPago: action.payload,
			};
		case CREAR_PAGO:
			const filtrarMetodoPago = state.metodosPago.find(
				(x) => x.id === action.payload.MetodoPagoId
			);

			const pagoMetodoPagoCompleto = {
				id: action.payload.id,
				importe: action.payload.importe,
				createdAt: action.payload.createdAt,
				MetodoPago: filtrarMetodoPago,
			};
			// modificar el action.payload
			const agregarPagoEnFactura = new ModificarArray(
				state.filaActiva.Factura.Pagos,
				pagoMetodoPagoCompleto
			);
			const PagosModificado = agregarPagoEnFactura.agregarObjetoEnArray();

			const facturaModificada = {
				...state.filaActiva.Factura,
				Pagos: PagosModificado,
			};

			const filaActivaModificada = {
				...state.filaActiva,
				Factura: facturaModificada,
			};

			return {
				...state,
				filaActiva: filaActivaModificada,
				mensaje: { msg: 'El pago ha sido creado', categoria: 'success' },
			};

		default:
			return state;
	}
};

export default EditarOrdenesReducer;
