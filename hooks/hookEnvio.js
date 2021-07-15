import React, { useState } from 'react';
import { Direccion } from '../functions/envio';

const useEnvio = (envio, direcciones) => {
	const direccionClienteElegido = new Direccion(direcciones, envio.select.id);

	const [stateEnvio, setStateEnvio] = useState({
		modoDirecc: envio.modoDirecc,
		dataDirecciones: direccionClienteElegido.creaDireccionesSelect(),
		valSelectDireccion: direccionClienteElegido.creaInitSelectDireccion(),
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
