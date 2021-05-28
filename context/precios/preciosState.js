import React, { useReducer } from 'react';
import PreciosContext from './preciosContext';
import PreciosReducer from './preciosReducer';
import clienteAxios from '../../config/axios';

import {
	TRAER_PRECIOS,
	FILAS_LISTA,
	LISTA_PRECIOS,
	FILAS_BUSQUEDA,
	ERROR_PRECIOS,
} from '../../types';

const PreciosState = (props) => {
	const initialState = {
		precios: [],
		filas: [],
		lista: 1,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(PreciosReducer, initialState);

	// las funciones
	const traerPrecios = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/precios');

			dispatch({
				type: TRAER_PRECIOS,
				payload: respuesta.data,
			});
		} catch (error) {
			dispatch({
				type: ERROR_PRECIOS,
				payload: error,
			});
		}
	};

	const handleLista = (lista) => {
		dispatch({
			type: LISTA_PRECIOS,
			payload: lista,
		});
	};

	const handleFilasLista = (precios, lista) => {
		dispatch({
			type: FILAS_LISTA,
			payload: { precios, lista },
		});
	};

	const handleFilasBusqueda = (precios, lista, busqueda) => {
		dispatch({
			type: FILAS_BUSQUEDA,
			payload: { precios, lista, busqueda },
		});
	};

	return (
		<PreciosContext.Provider
			value={{
				precios: state.precios,
				lista: state.lista,
				filas: state.filas,
				cargando: state.cargando,
				traerPrecios,
				handleLista,
				handleFilasLista,
				handleFilasBusqueda,
			}}
		>
			{props.children}
		</PreciosContext.Provider>
	);
};

export default PreciosState;
