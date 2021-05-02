import React, { createContext, useEffect, useState } from 'react';

export const ModalContext = createContext();

// datos select stock de producto en pto stock
function createData(
	id,
	codigo,
	descripcion,
	idPuntoStock,
	descripcionPuntoStock,
	cantidad
) {
	return {
		id,
		codigo,
		descripcion,
		idPuntoStock,
		descripcionPuntoStock,
		cantidad,
	};
}

const rows = [
	createData(
		'1',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		1,
		'Showroom',
		2
	),
	createData(
		'2',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		2,
		'Depósito',
		7
	),
	createData(
		'3',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		3,
		'Mercado Libre',
		3
	),
	createData(
		'4',
		'AL6V0210UNN',
		'IDENTIFICA DECO 40X40 CM - CUANDO NECESITABA UNA MANO, ME ENCONTRE CON SU PATA - SIN COLOR - UNICO - VELLON',
		6,
		'Outlet',
		1
	),
	createData(
		'5',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		1,
		'Showroom',
		2
	),
	createData(
		'6',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		2,
		'Depósito',
		7
	),
	createData(
		'7',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		3,
		'Mercado Libre',
		3
	),
	createData(
		'8',
		'CO2G0738EVE',
		'COLCHONETA LAVABLE PERRO CHICO - PERROS BEIGE - VERDE - S - GUATA',
		6,
		'Outlet',
		1
	),
	createData(
		'9',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		1,
		'Showroom',
		2
	),
	createData(
		'10',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		2,
		'Depósito',
		7
	),
	createData(
		'11',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		3,
		'Mercado Libre',
		3
	),
	createData(
		'12',
		'VV000000059',
		'COLCHONETA LAVABLE PERRO GRANDE - FRANJA CANICHE/BICHON - ROJO Y NEGRO - L - SIN RELLENO',
		6,
		'Outlet',
		1
	),
];

const ModalProvider = (props) => {
	// state del provider
	const [productoActivo, setProductoActivo] = useState(null);
	const [productoStock, setProductoStock] = useState({});

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setProductoActivo({});
	};

	useEffect(() => {
		// conexion con api
		const obtenerStock = () => {
			if (!productoActivo) return;

			const url = rows.filter((row) => row.codigo === productoActivo);

			const resultado = url;
			setProductoStock(resultado);
		};
		obtenerStock();
	}, [productoActivo]);

	return (
		<ModalContext.Provider
			value={{
				productoActivo,
				productoStock,
				open,
				setProductoActivo,
				handleOpen,
				handleClose,
			}}
		>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
