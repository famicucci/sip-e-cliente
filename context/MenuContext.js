import React, { createContext, useState } from 'react';

// crear context
export const MenuContext = createContext();

const MenuProvider = (props) => {
	const [openStock, setOpenStock] = useState(false);

	const handleClick = () => {
		setOpenStock(!openStock);
	};

	return (
		<MenuContext.Provider value={{ openStock, setOpenStock, handleClick }}>
			{props.children}
		</MenuContext.Provider>
	);
};

export default MenuProvider;
