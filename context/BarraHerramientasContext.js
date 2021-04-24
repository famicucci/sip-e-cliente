import React, { createContext, useState } from 'react';

// crear context
export const BarraHerramientasContext = createContext();

const BarraHerramientasProvider = (props) => {
	const [buscador, setBuscador] = useState(true);

	return (
		<BarraHerramientasContext.Provider value={{ buscador, setBuscador }}>
			{props.children}
		</BarraHerramientasContext.Provider>
	);
};

export default BarraHerramientasProvider;
