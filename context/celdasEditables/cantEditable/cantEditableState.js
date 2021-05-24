import React, { useReducer } from 'react';
import CantEditableContext from './cantEditableContext';
import CantEditableReducer from './cantEditableReducer';
import clienteAxios from '../../../config/axios';

import {
	ACTIVAR_FILA,
	NUEVA_CANTIDAD,
	MOSTRAR_ALERTA,
	CONFIRMAR_CAMBIO_STOCK,
} from '../../../types';

const CantEditableState = (props) => {
	const initialState = {
		filaActiva: {},
		cantidad: null,
		mensaje: '',
	};

	const [state, dispatch] = useReducer(CantEditableReducer, initialState);

	// las funciones
	const handleFilaActiva = (fila) => {
		dispatch({
			type: ACTIVAR_FILA,
			payload: fila,
		});
	};

	const handleNuevaCantidad = (cantidad) => {
		dispatch({
			type: NUEVA_CANTIDAD,
			payload: cantidad,
		});
	};

	const confirmarCantidad = async (filaActiva, cantidad) => {
		const { ProductoCodigo, PtoStockId } = filaActiva;

		const cambioStock = cantidad - filaActiva.cantidad;

		const datos = {
			ProductoCodigo: ProductoCodigo,
			PtoStockId: PtoStockId,
			cantidad: cambioStock,
			motivo: 'movimiento',
		};

		// codigoProducto
		try {
			const respuesta = await clienteAxios.put('/api/stock/', datos);

			dispatch({
				type: CONFIRMAR_CAMBIO_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: MOSTRAR_ALERTA,
				payload: error,
			});
		}
	};

	return (
		<CantEditableContext.Provider
			value={{
				filaActiva: state.filaActiva,
				cantidad: state.cantidad,
				handleFilaActiva,
				handleNuevaCantidad,
				confirmarCantidad,
			}}
		>
			{props.children}
		</CantEditableContext.Provider>
	);
};

export default CantEditableState;
