import React, { createContext, useState } from 'react';

// crear context
export const EnvioContext = createContext();

const EnvioProvider = (props) => {
	const envio = props.envio;
	const cliente = {
		nombre: 'julieta',
		apellido: 'almis',
		direcciones: [
			{ id: 1, descripcion: 'Nora Lange 962, VGB, Córdoba, Argentina' },
			{ id: 2, descripcion: 'Av. Julio a Roca 147, VGB, Córdoba, Argentina' },
		],
	};

	const [modoDirecc, setModoDirecc] = useState(envio.modoDirecc);

	let initSelectDireccion;
	if (!envio.select.id) {
		initSelectDireccion = cliente.direcciones[0].id;
	} else if (envio.select.id) {
		initSelectDireccion = envio.select.id;
	}
	const [valSelectDireccion, setValSelectDireccion] =
		useState(initSelectDireccion);
	const [valInputDireccion, setValInputDireccion] = useState(envio.input);
	const [valSelectTipo, setValSelectTipo] = useState(envio.tipo);
	const [valInputCosto, setValInputCosto] = useState(envio.costo);

	const handleSelectDireccion = (name, val) => {
		setValSelectDireccion(val);
	};

	const handleInputDireccion = (name, val) => {
		setValInputDireccion(val);
	};

	const handleSelectTipo = (name, val) => {
		setValSelectTipo(val);
	};

	const handleInputCosto = (name, val) => {
		setValInputCosto(val);
	};

	return (
		<EnvioContext.Provider
			value={{
				modoDirecc,
				valSelectDireccion,
				valInputDireccion,
				valSelectTipo,
				valInputCosto,
				setModoDirecc,
				handleSelectDireccion,
				handleInputDireccion,
				handleSelectTipo,
				handleInputCosto,
			}}
		>
			{props.children}
		</EnvioContext.Provider>
	);
};

export default EnvioProvider;
