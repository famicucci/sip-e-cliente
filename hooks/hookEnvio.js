import React, { useState } from 'react';

const useEnvio = (props) => {
	const envio = props;

	// if(!envio){setear envioInit}

	const cliente = {
		nombre: 'julieta',
		apellido: 'almis',
		direcciones: [
			{ id: 1, descripcion: 'Nora Lange 962, VGB, Córdoba, Argentina' },
			{ id: 2, descripcion: 'Av. Julio a Roca 147, VGB, Córdoba, Argentina' },
		],
	};

	let initSelectDireccion;
	if (!envio.select.id) {
		initSelectDireccion = cliente.direcciones[0].id;
	} else if (envio.select.id) {
		initSelectDireccion = envio.select.id;
	}

	const [stateEnvio, setStateEnvio] = useState({
		modoDirecc: envio.modoDirecc,
		valSelectDireccion: initSelectDireccion,
		valInputDireccion: envio.input,
		valSelectTipo: envio.tipo,
		valInputCosto: envio.costo,
	});

	const handleSwitchDireccion = () => {
		if (stateEnvio.modoDirecc === 'select') {
			setStateEnvio({ ...stateEnvio, modoDirecc: 'input' });
		} else if (stateEnvio.modoDirecc === 'input') {
			setStateEnvio({ ...stateEnvio, modoDirecc: 'select' });
		}
	};

	const handleSelectDireccion = (name, val) => {
		setStateEnvio({ ...stateEnvio, valSelectDireccion: val });
	};

	const handleInputDireccion = (name, val) => {
		setStateEnvio({ ...stateEnvio, valInputDireccion: val });
	};

	const handleSelectTipo = (name, val) => {
		setStateEnvio({ ...stateEnvio, valSelectTipo: val });
	};

	const handleInputCosto = (name, val) => {
		setStateEnvio({ ...stateEnvio, valInputCosto: val });
	};

	return [
		stateEnvio,
		handleSelectDireccion,
		handleInputDireccion,
		handleSelectTipo,
		handleInputCosto,
		handleSwitchDireccion,
	];
};

export default useEnvio;
