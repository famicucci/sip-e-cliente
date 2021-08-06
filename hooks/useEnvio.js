import React, { useState } from 'react';

const useEnvio = (envio, cliente) => {
	let initialState = {
		modoDirecc: 'select',
		input: '',
		select: null,
		tipo: 1,
		costo: 0,
	};

	if (Object.keys(envio).length !== 0) {
		initialState = envio;
	}

	const [stateEnvio, setStateEnvio] = useState(initialState);

	const handleSwitchDireccion = () => {
		if (stateEnvio.modoDirecc === 'select') {
			setStateEnvio({ ...stateEnvio, modoDirecc: 'input' });
		} else if (stateEnvio.modoDirecc === 'input') {
			setStateEnvio({ ...stateEnvio, modoDirecc: 'select' });
		}
	};

	const handleSelectDireccion = (name, val) => {
		const r = cliente.direcciones.find((x) => x.id === val);
		setStateEnvio({ ...stateEnvio, select: r });
	};

	const handleInputDireccion = (name, val) => {
		setStateEnvio({ ...stateEnvio, input: val });
	};

	const handleSelectTipo = (name, val) => {
		setStateEnvio({ ...stateEnvio, tipo: val });
	};

	const handleInputCosto = (name, val) => {
		setStateEnvio({ ...stateEnvio, costo: val });
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
