import React, { createContext, useEffect, useState } from 'react';

export const ModalContext = createContext();

const ModalProvider = (props) => {
	// state del provider
	const [idFila, setIdFila] = useState(null);

	return (
		<ModalContext.Provider value={{ idFila, setIdFila }}>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
