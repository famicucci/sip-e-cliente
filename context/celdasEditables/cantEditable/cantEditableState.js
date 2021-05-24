import React, { useReducer } from 'react';
import CantEditableContext from './cantEditableContext';
import CantEditableReducer from './cantEditableReducer';

import { ACTIVAR_FILA, NUEVA_CANTIDAD } from '../../../types';

const CantEditableState = (props) => {
	const initialState = {
		filaActiva: {},
		cantidad: null,
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

	const confirmarCantidad = (cantidad) => {
		// peticion post para cambiar la cantidad
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
