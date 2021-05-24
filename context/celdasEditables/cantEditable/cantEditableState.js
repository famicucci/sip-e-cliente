import React, { useReducer } from 'react';
import CantEditableContext from './cantEditableContext';
import CantEditableReducer from './cantEditableReducer';

import { ACTIVAR_FILA } from '../../../types';

const CantEditableState = (props) => {
	const initialState = {
		filaActiva: null,
		nuevaCant: null,
	};

	const [state, dispatch] = useReducer(CantEditableReducer, initialState);

	// las funciones
	const handleFilaActiva = (fila) => {
		dispatch({
			type: ACTIVAR_FILA,
			payload: fila,
		});
	};

	return (
		<CantEditableContext.Provider
			value={{ filaActiva: state.filaActiva, handleFilaActiva }}
		>
			{props.children}
		</CantEditableContext.Provider>
	);
};

export default CantEditableState;
