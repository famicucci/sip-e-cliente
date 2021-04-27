import React, { createContext, useState } from 'react';

// crear context
export const BarraHerramientasContext = createContext();

const BarraHerramientasProvider = (props) => {
	const [buscador, setBuscador] = useState(false);
	const [selectListaPrecio, setSelectListaPrecio] = useState(true);

	return (
		<BarraHerramientasContext.Provider
			value={{ buscador, selectListaPrecio, setBuscador, setSelectListaPrecio }}
		>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasProvider;
