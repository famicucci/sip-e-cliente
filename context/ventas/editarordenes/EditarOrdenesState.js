import React, { useReducer } from 'react';
import EditarOrdenesContext from './EditarOrdenesContext';
import EditarOrdenesReducer from './EditarOrdenesReducer';
import clienteAxios from '../../../config/axios';
import { DetalleFactura } from '../../../functions/Factura';
import { FacturaBD } from '../../../functions/Factura';

import {
	TRAER_ORDENES,
	ELIMINAR_ORDEN,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ORDENES,
	MODIFICAR_ESTADO_ORDEN,
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
	ACTUALIZAR_PAGO,
	MOSTRAR_ALERTA_EDITAR_ORDENES,
	OCULTAR_ALERTA_EDITAR_ORDENES,
	ACTIVAR_ORDEN,
} from '../../../types';

const EditarOrdenesState = (props) => {
	const initialState = {
		ordenes: [],
		filaActiva: {},
		factura: {},
		openModalDetalleOrden: false,
		openModalInformacionCliente: false,
		openModalCrearFactura: false,
		openModalConfirmarCrearFactura: false,
		openModalFactura: false,
		openModalCrearPago: false,
		mensajeEditarOrdenes: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(EditarOrdenesReducer, initialState);

	// las funciones
	const traerOrdenes = async (busqueda) => {
		try {
			let r = await clienteAxios.get('/api/ordenes/');

			dispatch({
				type: TRAER_ORDENES,
				payload: { respuesta: r.data, busqueda: busqueda },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleEstadoOrden = async (idOrder, idStatus, descriptionStatus) => {
		try {
			let r = await clienteAxios.put(`/api/ordenes/${idOrder}`, {
				OrdenEstadoId: idStatus,
			});

			dispatch({
				type: MODIFICAR_ESTADO_ORDEN,
				payload: {
					idOrder,
					idStatus,
					descriptionStatus,
				},
			});

			mostrarAlertaEditarOrdenes(r.data.msg, 'success');
		} catch (error) {
			console.log(error);
		}
	};

	const handleFilaActivaOrden = (id) => {
		let r = state.ordenes.find((x) => x.id === id);

		if (!r) r = {};

		dispatch({
			type: FILA_ACTIVA_ORDEN,
			payload: r,
		});
	};

	const handleDetalleFactura = (detalleOrden) => {
		const detalleFactura = DetalleFactura.crearDetalleFactura(detalleOrden);

		dispatch({
			type: CREAR_DETALLE_FACTURA,
			payload: detalleFactura,
		});
	};

	const crearFactura = async (objFactura) => {
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
		// what can we modify ??
		// observaciones
		// direccionEnvio, tarifaEnvio and TipoEnvioId
		// ordenEcommerce
		// PtoVentaId
		// OrdenEstadoId
		try {
			await clienteAxios.put(`/api/ordenes/${ordenId}`, ordenObj);

			const modifyFilaActiva = (ordenObj, filaActiva) => {
				const arrayKeys = Object.keys(ordenObj);

				let newFilaActiva = filaActiva;
				arrayKeys.forEach(
					(x, i) =>
						(newFilaActiva = {
							...newFilaActiva,
							[arrayKeys[i]]: ordenObj[x],
						})
				);

				return newFilaActiva;
			};

			const filaActivaMod = modifyFilaActiva(ordenObj, state.filaActiva);

			// modify filaActiva
			dispatch({
				type: FILA_ACTIVA_ORDEN,
				payload: filaActivaMod,
			});
			// modify ordenes
			dispatch({
				type: MODIFICAR_ORDENES,
				payload: filaActivaMod,
			});

			mostrarAlertaEditarOrdenes('Orden modificada!', 'success');
		} catch (error) {
			mostrarAlertaEditarOrdenes('Hubo un error', 'error');
		}
	};

	const crearPago = async (pago) => {
		try {
			const respuesta = await clienteAxios.post(`/api/pagos`, pago);

			// this must be in the component
			// verificar si debo modificar la factura
			// si corresponde, debo modificar el estadoPago de de la factura
			const factura = new FacturaBD(state.filaActiva.Factura);

			if (
				parseFloat(pago.importe) + factura.sumaPagos() ===
				parseFloat(factura.importeFinal)
			) {
				const facturaObj = { estadoPago: 'Pago' };

				await clienteAxios.put(`/api/facturas/${factura.id}`, facturaObj);
			}

			dispatch({
				type: ACTUALIZAR_PAGO,
				payload: respuesta.data,
			});

			dispatch({
				type: ACTIVAR_ORDEN,
				payload: state.filaActiva.id,
			});

			mostrarAlertaEditarOrdenes('El pago ha sido creado', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	const mostrarAlertaEditarOrdenes = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA_EDITAR_ORDENES,
			payload: { msg, categoria },
		});

		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_EDITAR_ORDENES,
			});
		}, 4000);
	};

	const ocultarAlertaEditarOrdenes = () => {
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA_EDITAR_ORDENES,
			});
		}, 4000);
	};

	const removeOrder = async (idOrder) => {
		try {
			let r = await clienteAxios.delete(`/api/ordenes/${idOrder}`);

			dispatch({
				type: ELIMINAR_ORDEN,
				payload: idOrder,
			});

			mostrarAlertaEditarOrdenes(
				`La orden ${idOrder} ha sido eliminada!`,
				'success'
			);
		} catch (error) {
			mostrarAlertaEditarOrdenes(error.msg, error.severity);
		}
	};

	return (
		<EditarOrdenesContext.Provider
			value={{
				ordenes: state.ordenes,
				filaActiva: state.filaActiva,
				factura: state.factura,
				openModalDetalleOrden: state.openModalDetalleOrden,
				openModalInformacionCliente: state.openModalInformacionCliente,
				openModalCrearFactura: state.openModalCrearFactura,
				openModalConfirmarCrearFactura: state.openModalConfirmarCrearFactura,
				openModalFactura: state.openModalFactura,
				openModalCrearPago: state.openModalCrearPago,
				tiposEnvio: state.tiposEnvio,
				mensajeEditarOrdenes: state.mensajeEditarOrdenes,
				cargando: state.cargando,
				traerOrdenes,
				modificarOrden,
				handleEstadoOrden,
				handleFilaActivaOrden,
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
				crearPago,
				ocultarAlertaEditarOrdenes,
				mostrarAlertaEditarOrdenes,
				removeOrder,
			}}
		>
			{props.children}
		</EditarOrdenesContext.Provider>
	);
};

export default EditarOrdenesState;
