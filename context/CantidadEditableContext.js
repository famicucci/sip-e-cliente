import React, { createContext, useState } from 'react';

// crear context
export const CantidadEditableContext = createContext();

const CantidadEditableProvider = (props) => {
	const [filaActiva, setFilaActiva] = useState({});
	const [nuevaCantidad, setNuevaCantidad] = useState(null);

	const editar = (idFilaActiva, idFila) => {
		if (idFilaActiva === idFila) {
			return true;
		} else {
			return false;
		}
	};

	const confirmar = (cantidad, nuevaCantidad) => {
		console.log(cantidad);
		console.log(nuevaCantidad);
		const cambioStock = nuevaCantidad - cantidad;
		console.log(cambioStock);
	};

	return (
		<CantidadEditableContext.Provider
			value={{
				filaActiva,
				nuevaCantidad,
				setFilaActiva,
				setNuevaCantidad,
				editar,
				confirmar,
			}}
		>
			{props.children}
		</CantidadEditableContext.Provider>
	);
};

export default CantidadEditableProvider;
