import React, { createContext, useState } from 'react';

// crear context
export const BotoneraCarrContext = createContext();

const BotoneraCarrProvider = (props) => {
	const [openNota, setOpenNota] = useState(false);
	const [openVerMas, setOpenVerMas] = useState(false);
	const [openModalCliente, setOpenModalCliente] = useState(false);
	const [openModalEnvio, setOpenModalEnvio] = useState(false);

	const handleNota = () => {
		if (openVerMas) {
			setOpenVerMas(false);
		}
		setOpenNota(!openNota);
	};

	const handleVerMas = () => {
		if (openNota) {
			setOpenNota(false);
		}
		setOpenVerMas(!openVerMas);
	};

	const handleOpenCliente = () => {
		setOpenModalCliente(true);
	};

	const handleOpenEnvio = () => {
		setOpenModalEnvio(true);
	};

	const handleClose = () => {
		setOpenModalCliente(false);
		setOpenModalEnvio(false);
	};

	return (
		<BotoneraCarrContext.Provider
			value={{
				openNota,
				openVerMas,
				openModalCliente,
				openModalEnvio,
				handleNota,
				handleVerMas,
				handleOpenCliente,
				handleOpenEnvio,
				setOpenModalCliente,
				handleClose,
			}}
		>
			{props.children}
		</BotoneraCarrContext.Provider>
	);
};

export default BotoneraCarrProvider;
