import React, { useState } from 'react';

const useEnvio = (envio, direcciones) => {
	const creaDireccionesSelect = (direcciones) => {
		let dataDirecciones = [];

		if (direcciones.length === 0) {
			dataDirecciones = [
				{ id: 0, descripcion: 'No hay direcciones para este cliente' },
			];
		} else {
			dataDirecciones = direcciones.map((x) => ({
				id: x.id,
				descripcion: `${x.calle} ${x.numeroCalle}, ${x.piso}, ${x.depto}, ${x.barrio}, ${x.ciudad}`,
			}));
		}

		return dataDirecciones;
	};

	const creaInitSelectDireccion = (direcciones, dataDirecciones, valActual) => {
		let initSelectDireccion;
		if (direcciones.length === 0) {
			initSelectDireccion = dataDirecciones[0].id;
		} else {
			if (valActual) {
				initSelectDireccion = valActual;
			} else {
				initSelectDireccion = dataDirecciones[0].id;
			}
		}
		return initSelectDireccion;
	};

	const [stateEnvio, setStateEnvio] = useState({
		modoDirecc: envio.modoDirecc,
		dataDirecciones: creaDireccionesSelect(direcciones),
		valSelectDireccion: creaInitSelectDireccion(
			direcciones,
			creaDireccionesSelect(direcciones),
			envio.select.id
		),
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
