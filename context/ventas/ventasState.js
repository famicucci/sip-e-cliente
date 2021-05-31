import React, { useReducer } from 'react';
import VentasContext from './ventasContext';
import VentasReducer from './ventasReducer';
import clienteAxios from '../../config/axios';

import { PRECIOS_PTO_STOCK, PRECIOS_PTO_STOCK_FILAS } from '../../types';

const VentasState = (props) => {
	const initialState = {
		preciosPtoStock: [],
		filas: [],
		ptoStock: 1,
		listaPrecio: 1,
	};

	const [state, dispatch] = useReducer(VentasReducer, initialState);

	// las funciones
	const traerPreciosPtoStock = async () => {
		try {
			const respuesta = await clienteAxios.get('/api/ventas/pto-stock/');

			dispatch({
				type: PRECIOS_PTO_STOCK,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleFilasPtoStock = () => {
		dispatch({
			type: PRECIOS_PTO_STOCK_FILAS,
		});
	};

	return (
		<VentasContext.Provider
			value={{
				preciosPtoStock: state.preciosPtoStock,
				filas: state.filas,
				ptoStock: state.ptoStock,
				traerPreciosPtoStock,
				handleFilasPtoStock,
			}}
		>
			{props.children}
		</VentasContext.Provider>
	);
};

export default VentasState;
