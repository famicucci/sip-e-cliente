import React, { createContext, useState } from 'react';

// crear context
export const BarraHerramientasContext = createContext();

const BarraHerramientasProvider = (props) => {
	// define si se muestra el elemento
	const [buscador, setBuscador] = useState(false);
	const [selectListaPrecio, setSelectListaPrecio] = useState(true);

	// define las funciones que deben estar disponibles en todos lados
	const [busqueda, setBusqueda] = useState('');
	const [filas, setFilas] = useState([]);

	// filtra las filas segun la búsqueda
	const filtrado = (filas, busqueda) => {
		const busquedaMayus = busqueda.toLowerCase();

		const rowsFiltradas = filas.filter(
			(row) =>
				Object.values(row).join().toLowerCase().indexOf(busquedaMayus) !== -1
		);

		setFilas(rowsFiltradas);
	};

	return (
		<BarraHerramientasContext.Provider
			value={{
				buscador,
				selectListaPrecio,
				busqueda,
				filas,
				setBuscador,
				setSelectListaPrecio,
				setBusqueda,
				setFilas,
				filtrado,
			}}
		>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasProvider;
