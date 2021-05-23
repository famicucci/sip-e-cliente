import React, { createContext, useState } from 'react';

// crear context
export const BarraHerramientasContext = createContext();

const BarraHerramientasProvider = (props) => {
	// define si se muestra el elemento
	const [buscador, setBuscador] = useState(false);
	const [selectListaPrecio, setSelectListaPrecio] = useState(false);
	const [selectPuntoStock, setSelectPuntoStock] = useState(false);

	// define las funciones que deben estar disponibles en todos lados
	const [busqueda, setBusqueda] = useState('');
	const [puntoStock, setPuntoStock] = useState(1);

	// filtra segun el punto de stock
	const filtraPuntoStock = (filas, puntoStock) => {
		const rowsFiltradas = filas.filter(
			(row) => row.idPuntoStock === puntoStock
		);
		return rowsFiltradas;
	};

	return (
		<BarraHerramientasContext.Provider
			value={{
				buscador,
				selectListaPrecio,
				selectPuntoStock,
				busqueda,
				puntoStock,
				setBuscador,
				setSelectListaPrecio,
				setSelectPuntoStock,
				setBusqueda,
				setPuntoStock,
				filtraPuntoStock,
			}}
		>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasProvider;
