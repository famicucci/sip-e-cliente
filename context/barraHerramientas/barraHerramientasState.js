import React, { useReducer } from 'react';
import BarraHerramientasContext from './barraHerramientasContext';
import BarraHerramientasReducer from './barraHerramientasReducer';

import {
	HERRAMIENTAS_PRECIOS,
	BUSQUEDA_ACTUAL,
	HERRAMIENTAS_STOCK_PRODUCTO,
	HERRAMIENTAS_STOCK_PTO_STOCK,
} from '../../types';

const BarraHerramientasState = (props) => {
	const initialState = {
		buscador: false,
		selectListaPrecio: false,
		selectPtoStock: false,
		busqueda: '',
	};

	const [state, dispatch] = useReducer(BarraHerramientasReducer, initialState);

	// las funciones
	const handleHerramientasPrecios = () => {
		dispatch({
			type: HERRAMIENTAS_PRECIOS,
		});
	};

	const handleHerramientasStockProducto = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_PRODUCTO,
		});
	};

	const handleHerramientasStockPtoStock = () => {
		dispatch({
			type: HERRAMIENTAS_STOCK_PTO_STOCK,
		});
	};

	const handleBusqueda = (busqueda) => {
		dispatch({
			type: BUSQUEDA_ACTUAL,
			payload: busqueda,
		});
	};

	return (
		<BarraHerramientasContext.Provider
			value={{
				buscador: state.buscador,
				selectListaPrecio: state.selectListaPrecio,
				selectPtoStock: state.selectPtoStock,
				busqueda: state.busqueda,
				handleHerramientasPrecios,
				handleHerramientasStockProducto,
				handleHerramientasStockPtoStock,
				handleBusqueda,
			}}
		>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasState;
