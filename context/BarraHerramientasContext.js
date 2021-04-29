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
	const [lista, setLista] = useState(1);
	const [puntoStock, setPuntoStock] = useState(1);

	// filtra las filas segun la búsqueda
	const filtrado = (filas, busqueda) => {
		const busquedaMayus = busqueda.toLowerCase();

		const rowsFiltradas = filas.filter(
			(row) =>
				Object.values(row).join().toLowerCase().indexOf(busquedaMayus) !== -1
		);

		return rowsFiltradas;
	};

	// filtra segun la lista de precio
	const filtraListaPrecio = (filas, lista) => {
		const rowsFiltradas = filas.filter((row) => row.idListaPrecio === lista);
		return rowsFiltradas;
	};

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
				busqueda,
				lista,
				puntoStock,
				selectPuntoStock,
				setBuscador,
				setSelectListaPrecio,
				setBusqueda,
				filtrado,
				filtraListaPrecio,
				setLista,
				setPuntoStock,
				setSelectPuntoStock,
				filtraPuntoStock,
			}}
		>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasProvider;
