import React, { useReducer } from 'react';
import GlobalDataContext from './GlobalDataContext';
import GlobalDataReducer from './GlobalDataReducer';
import clienteAxios from '../../config/axios';

import { TRAER_PTOS_VENTA } from '../../types';

const GlobalDataState = (props) => {
	const initialState = {
		salePoints: null,
	};

	const [state, dispatch] = useReducer(GlobalDataReducer, initialState);

	const getSalePoints = async () => {
		try {
			const respuesta = await clienteAxios.get(`/api/ventas/ptos-venta`);

			dispatch({
				type: TRAER_PTOS_VENTA,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<GlobalDataContext.Provider
			value={{
				salePoints: state.salePoints,
				getSalePoints,
			}}
		>
			{props.children}
		</GlobalDataContext.Provider>
	);
};

export default GlobalDataState;
