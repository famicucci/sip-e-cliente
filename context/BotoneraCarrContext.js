import React, { createContext, useState } from 'react';

// crear context
export const BotoneraCarrContext = createContext();

const BotoneraCarrProvider = (props) => {
	const [openNota, setOpenNota] = useState(false);

	const handleNota = () => {
		setOpenNota(!openNota);
	};

	return (
		<BotoneraCarrContext.Provider value={{ openNota, handleNota }}>
			{props.children}
		</BotoneraCarrContext.Provider>
	);
};

export default BotoneraCarrProvider;
