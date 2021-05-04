import React, { createContext, useState } from 'react';

// crear context
export const MenuContext = createContext();

const MenuProvider = (props) => {
	const [openStock, setOpenStock] = useState(false);
	const [openVentas, setOpenVentas] = useState(false);

	const handleClickStock = () => {
		setOpenStock(!openStock);
	};

	const handleClickVentas = () => {
		setOpenVentas(!openVentas);
	};

	return (
		<MenuContext.Provider
			value={{
				openStock,
				openVentas,
				setOpenStock,
				handleClickStock,
				handleClickVentas,
			}}
		>
			{props.children}
		</MenuContext.Provider>
	);
};

export default MenuProvider;
