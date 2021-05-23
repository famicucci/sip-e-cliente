import React, { useReducer } from 'react';
import StockContext from './stockContext';
import StockReducer from './stockReducer';
import clienteAxios from '../../config/axios';

import { PTO_STOCK } from '../../types';

const StockState = (props) => {
	const initialState = {
		stocks: [],
		filas: [],
		ptoStock: 1,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(StockReducer, initialState);

	// las funciones
	// const traerStockProducto = async () => {
	// 	try {
	// 		const respuesta = await clienteAxios.get('/api/precios');

	// 		dispatch({
	// 			type: TRAER_PRECIOS,
	// 			payload: respuesta.data,
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR_PRECIOS,
	// 			payload: error,
	// 		});
	// 	}
	// };

	const handlePtoStock = (ptoStock) => {
		dispatch({
			type: PTO_STOCK,
			payload: ptoStock,
		});
	};

	return (
		<StockContext.Provider
			value={{
				filas: state.filas,
				ptoStock: state.ptoStock,
				handlePtoStock,
				// traerStockProducto,
			}}
		>
			{props.children}
		</StockContext.Provider>
	);
};

export default StockState;
