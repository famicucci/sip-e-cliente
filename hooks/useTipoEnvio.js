import React, { useState, useEffect } from 'react';

const useTipoEnvio = (tiposEnvio, id) => {
	const [descripcionTipoEnvio, setDescripcionTipoEnvio] = useState('');

	useEffect(() => {
		// change state descripcion
		handleDescripcion(tiposEnvio, id);
	}, [id]);

	const handleDescripcion = (tiposEnvio, id) => {
		let descripcion;

		const r = tiposEnvio.find((x) => x.id === id);

		if (r) {
			descripcion = r.descripcion;
		}

		setDescripcionTipoEnvio(descripcion);
	};

	return {
		descripcionTipoEnvio,
	};
};

export default useTipoEnvio;
