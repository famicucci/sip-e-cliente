import React, { useReducer } from 'react';
import EditarOrdenesContext from './EditarOrdenesContext';
import EditarOrdenesReducer from './EditarOrdenesReducer';
import clienteAxios from '../../../config/axios';
import { DetalleFactura } from '../../../functions/Factura';

import {
	TRAER_ORDENES,
	TRAER_ESTADOS_ORDEN,
	FILAS_ORDENES,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ORDEN,
	MODIFICAR_ESTADO_ORDEN,
	MODIFICAR_FACTURA,
	CREAR_DETALLE_FACTURA,
	CREAR_FACTURA,
	MODAL_DETALLE_ORDEN,
	MODAL_INFORMACION_CLIENTE,
	MODAL_CREAR_FACTURA,
	MODAL_CONFIRMAR_FACTURA,
	MODAL_FACTURA,
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

const EditarOrdenesState = (props) => {
	const initialState = {
		ordenes: [],
		filasOrdenes: [],
		filas: [],
		filaActiva: {},
		factura: {},
		estadosOrden: [],
		openModalDetalleOrden: false,
		openModalInformacionCliente: false,
		openModalCrearFactura: false,
		openModalConfirmarCrearFactura: false,
		openModalFactura: false,
		openModalCrearPago: false,
		tiposEnvio: [],
		metodosPago: [],
		ptosVenta: [],
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(EditarOrdenesReducer, initialState);

	// las funciones
	const traerOrdenes = async () => {
		try {
			let r = await clienteAxios.get('/api/ordenes/');

			dispatch({
				type: TRAER_ORDENES,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const traerEstadosOrden = async () => {
		try {
			const r = await clienteAxios.get('/api/estados-orden/');

			dispatch({
				type: TRAER_ESTADOS_ORDEN,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleFilasOrdenes = () => {
		dispatch({
			type: FILAS_ORDENES,
		});
	};

	const handleEstadoOrden = async (orden, value, descripcion) => {
		const datos = {
			OrdenEstadoId: value,
		};

		try {
			let r = await clienteAxios.put(`/api/ordenes/${orden}`, datos);

			dispatch({
				type: MODIFICAR_ESTADO_ORDEN,
				payload: {
					r: r.data,
					orden: orden,
					value: value,
					descripcion: descripcion,
				},
			});
		} catch (error) {
			console.log(error);
		}

		dispatch({
			type: BORRAR_MENSAJE,
		});
	};

	const handleFilaActivaOrden = (id) => {
		dispatch({
			type: FILA_ACTIVA_ORDEN,
			payload: id,
		});
	};

	const handleFactura = async (facturaId, facturaObj) => {
		try {
			let r = await clienteAxios.put(`/api/facturas/${facturaId}`, facturaObj);

			console.log(r);
			// dispatch({
			// 	type: MODIFICAR_FACTURA,
			// 	payload: facturaObj,
			// });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDetalleFactura = (detalleOrden) => {
		const detalleFactura = DetalleFactura.crearDetalleFactura(detalleOrden);

		dispatch({
			type: CREAR_DETALLE_FACTURA,
			payload: detalleFactura,
		});
	};

	const crearFactura = async (objFactura) => {
		console.log(objFactura);
		try {
			const crearFactura = await clienteAxios.post(
				'/api/facturas/',
				objFactura
			);
			const idFactura = crearFactura.data.id;
			const r2 = await clienteAxios.get(`/api/facturas/${idFactura}`);
			const factura = r2.data;
			dispatch({
				type: CREAR_FACTURA,
				payload: factura,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleOpenModalDetalleOrden = () => {
		dispatch({
			type: MODAL_DETALLE_ORDEN,
		});
	};

	const handleOpenModalInformacionCliente = () => {
		dispatch({
			type: MODAL_INFORMACION_CLIENTE,
		});
	};

	const handleOpenModalCrearFactura = () => {
		dispatch({
			type: MODAL_CREAR_FACTURA,
		});
	};

	const handleOpenModalConfirmarCrearFactura = () => {
		dispatch({
			type: MODAL_CONFIRMAR_FACTURA,
		});
	};

	const handleOpenModalFactura = () => {
		dispatch({
			type: MODAL_FACTURA,
		});
	};

	const handleOpenModalCrearPago = () => {
		dispatch({
			type: MODAL_CREAR_PAGO,
		});
	};

	const handleCloseModal = () => {
		dispatch({
			type: MODAL_CLOSE,
		});
	};

	const handleCloseModalConfirmarCrearFactura = () => {
		dispatch({
			type: MODAL_CLOSE_CONFIRMAR_FACTURA,
		});
	};

	const handleCloseModalCrearPago = () => {
		dispatch({
			type: MODAL_CLOSE_CREAR_PAGO,
		});
	};

	const modificarOrden = async (ordenId, ordenObj) => {
		try {
			const r = await clienteAxios.put(`/api/ordenes/${ordenId}`, ordenObj);

			dispatch({
				type: MODIFICAR_ORDEN,
				payload: { r: r.data, ordenObj },
			});
		} catch (error) {
			console.log(error);
		}

		dispatch({
			type: BORRAR_MENSAJE,
		});
	};

	const traerTiposEnvio = async () => {
		try {
			const r = await clienteAxios.get(`/api/tipos-envio`);

			dispatch({
				type: TIPOS_ENVIO,
				payload: r.data,
			});
		} catch (error) {
			console.log(error);
			// dispatch({
			// 	type: ERROR_BARRA_HERRAMIENTAS,
			// 	payload: error,
			// });
		}
	};

	const traerPtosVenta = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/ventas/ptos-venta`);

			dispatch({
				type: PTOS_VENTA,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
			// dispatch({
			// 	type: ERROR_BARRA_HERRAMIENTAS,
			// 	payload: error,
			// });
		}
	};

	const traerMetodosPago = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/metodos-pago`);

			dispatch({
				type: METODOS_PAGO,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
			// dispatch({
			// 	type: ERROR_BARRA_HERRAMIENTAS,
			// 	payload: error,
			// });
		}
	};

	const crearPago = async (pago) => {
		try {
			const respuesta = await clienteAxios.post(`/api/pagos`, pago);

			dispatch({
				type: CREAR_PAGO,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
			// dispatch({
			// 	type: ERROR_BARRA_HERRAMIENTAS,
			// 	payload: error,
			// });
		}
	};

	return (
		<EditarOrdenesContext.Provider
			value={{
				ordenes: state.ordenes,
				filasOrdenes: state.filasOrdenes,
				filas: state.filas,
				filaActiva: state.filaActiva,
				factura: state.factura,
				estadosOrden: state.estadosOrden,
				openModalDetalleOrden: state.openModalDetalleOrden,
				openModalInformacionCliente: state.openModalInformacionCliente,
				openModalCrearFactura: state.openModalCrearFactura,
				openModalConfirmarCrearFactura: state.openModalConfirmarCrearFactura,
				openModalFactura: state.openModalFactura,
				openModalCrearPago: state.openModalCrearPago,
				tiposEnvio: state.tiposEnvio,
				metodosPago: state.metodosPago,
				ptosVenta: state.ptosVenta,
				mensaje: state.mensaje,
				cargando: state.cargando,
				traerOrdenes,
				traerEstadosOrden,
				modificarOrden,
				handleFilasOrdenes,
				handleEstadoOrden,
				handleFilaActivaOrden,
				handleFactura,
				crearFactura,
				handleDetalleFactura,
				handleOpenModalDetalleOrden,
				handleOpenModalInformacionCliente,
				handleOpenModalCrearFactura,
				handleOpenModalConfirmarCrearFactura,
				handleOpenModalFactura,
				handleOpenModalCrearPago,
				handleCloseModal,
				handleCloseModalConfirmarCrearFactura,
				handleCloseModalCrearPago,
				traerTiposEnvio,
				traerPtosVenta,
				traerMetodosPago,
				crearPago,
			}}
		>
			{props.children}
		</EditarOrdenesContext.Provider>
	);
};

export default EditarOrdenesState;
