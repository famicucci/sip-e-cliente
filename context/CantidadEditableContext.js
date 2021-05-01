import React, { createContext, useState } from 'react';

// crear context
export const CantidadEditableContext = createContext();

const CantidadEditableProvider = (props) => {
	const [filaActiva, setFilaActiva] = useState(null);

	const editar = (filaActiva, idFila) => {
		if (filaActiva === idFila) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<CantidadEditableContext.Provider
			value={{
				filaActiva,
				setFilaActiva,
				editar,
			}}
		>
			{props.children}
		</CantidadEditableContext.Provider>
	);
};

export default CantidadEditableProvider;
