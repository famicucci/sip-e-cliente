import React, { createContext, useState } from 'react';

// crear context
export const BotoneraCarrContext = createContext();

const BotoneraCarrProvider = (props) => {
	const [openNota, setOpenNota] = useState(false);
	const [openVerMas, setOpenVerMas] = useState(false);
	const [openModal, setOpenModal] = useState(false);

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

	const handleOpen = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<BotoneraCarrContext.Provider
			value={{
				openNota,
				openVerMas,
				openModal,
				handleNota,
				handleVerMas,
				handleOpen,
				setOpenModal,
				handleClose,
			}}
		>
			{props.children}
		</BotoneraCarrContext.Provider>
	);
};

export default BotoneraCarrProvider;
