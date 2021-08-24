import React, { useReducer } from 'react';
import EditarOrdenesContext from './EditarOrdenesContext';
import EditarOrdenesReducer from './EditarOrdenesReducer';
import clienteAxios from '../../../config/axios';
import { DetalleFactura } from '../../../functions/Factura';
import { FacturaBD } from '../../../functions/Factura';

import {
	TRAER_ORDENES,
	TRAER_ESTADOS_ORDEN,
	FILAS_ORDENES,
	FILA_ACTIVA_ORDEN,
	MODIFICAR_ORDENES,
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
	FILAS_ORDENES_FILTRO,
	MOSTRAR_ALERTA_EDITAR_ORDENES,
	OCULTAR_ALERTA_EDITAR_ORDENES,
} from '../../../types';
import { TipoEnvio } from '../../../functions/envio';

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
		try {
			const crearFactura = await clienteAxios.post(
				'/api/facturas/',
				objFactura
			);
			const idFactura = crearFactura.data.id;
			const r2 = await clienteAxios.get(`/api/facturas/${idFactura}`);
			const factura = r2.data;
			console.log(factura);
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

			// verificar si debo modificar la factura
			// si corresponde, debo modificar el estadoPago de de la factura
			const factura = new FacturaBD(state.filaActiva.Factura);

			if (
				parseFloat(pago.importe) + factura.sumaPagos() ===
				parseFloat(factura.importeFinal)
			) {
				// handleFactura(factura.id, { estadoPago: 'Pago' });
				const facturaObj = { estadoPago: 'Pago' };

				await clienteAxios.put(`/api/facturas/${factura.id}`, facturaObj);
			}

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

	const handleFilasOrdenesFiltro = (bus) => {
		dispatch({
			type: FILAS_ORDENES_FILTRO,
			payload: bus,
		});
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
				mensajeEditarOrdenes: state.mensajeEditarOrdenes,
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
				handleFilasOrdenesFiltro,
				ocultarAlertaEditarOrdenes,
				mostrarAlertaEditarOrdenes,
			}}
		>
			{props.children}
		</EditarOrdenesContext.Provider>
	);
};

export default EditarOrdenesState;
