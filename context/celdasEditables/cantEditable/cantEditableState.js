import React, { useReducer } from 'react';
import CantEditableContext from './cantEditableContext';
import CantEditableReducer from './cantEditableReducer';
import clienteAxios from '../../../config/axios';

import {
	PRODUCTO_STATE,
	ACTIVAR_FILA,
	MOSTRAR_ALERTA,
	CONFIRMAR_CAMBIO_STOCK,
} from '../../../types';

const CantEditableState = (props) => {
	const initialState = {
		productoActivo: {},
		idFilaActiva: null,
		cargando: false,
		mensaje: '',
	};

	const [state, dispatch] = useReducer(CantEditableReducer, initialState);

	const productoActivoState = (productoActivo) => {
		dispatch({
			type: PRODUCTO_STATE,
			payload: productoActivo,
		});
	};

	// las funciones
	const handleFilaActiva = (id) => {
		dispatch({
			type: ACTIVAR_FILA,
			payload: id,
		});
	};

	const modificarStock = async (ProductoCodigo, PtoStockId, cantidad) => {
		const datos = {
			ProductoCodigo: ProductoCodigo,
			PtoStockId: PtoStockId,
			cantidad: cantidad,
			motivo: 'movimiento',
		};

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
				idFilaActiva: state.idFilaActiva,
				cantidad: state.cantidad,
				productoActivoState,
				handleFilaActiva,
				modificarStock,
			}}
		>
			{props.children}
		</CantEditableContext.Provider>
	);
};

export default CantEditableState;
