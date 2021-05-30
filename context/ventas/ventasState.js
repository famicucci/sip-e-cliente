import React, { useReducer } from 'react';
import VentasContext from './ventasContext';
import VentasReducer from './ventasReducer';
import clienteAxios from '../../config/axios';

import { PRECIOS_PTO_STOCK } from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
	};

	const [state, dispatch] = useReducer(VentasReducer, initialState);

	// las funciones
	const traerPreciosPtoStock = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/ventas/pto-stock/');

			console.log(respuesta.data);
			dispatch({
				type: PRECIOS_PTO_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
			// dispatch({
			// 	type: ERROR_STOCK,
			// 	payload: error,
			// });
		}
	};

	return (
		<VentasContext.Provider
			value={{ preciosPtoStock: state.preciosPtoStock, traerPreciosPtoStock }}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
