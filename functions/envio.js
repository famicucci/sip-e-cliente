class Direccion {
	constructor(direccionesCliente, valActualSelect) {
		this.direcciones = direccionesCliente;
		this.valActualSelect = valActualSelect;
	}

	creaDireccionesSelect() {
		let dataDirecciones = [];

		if (this.direcciones.length === 0) {
			dataDirecciones = [
				{ id: 0, descripcion: 'No hay direcciones para este cliente' },
			];
		} else {
			dataDirecciones = this.direcciones.map((x) => ({
				id: x.id,
				descripcion: `${x.calle} ${x.numeroCalle}, ${x.piso}, ${x.depto}, ${x.barrio}, ${x.ciudad}`,
			}));
		}

		return dataDirecciones;
	}

	creaInitSelectDireccion() {
		const dataDirecciones = this.creaDireccionesSelect();

		let initSelectDireccion;
		if (this.direcciones.length === 0) {
			initSelectDireccion = dataDirecciones[0].id;
		} else {
			if (this.valActualSelect) {
				initSelectDireccion = this.valActualSelect;
			} else {
				initSelectDireccion = dataDirecciones[0].id;
			}
		}
		return initSelectDireccion;
	}
}

class Envio {
	constructor(
		modoDirecc,
		valDireccionEnvioSelect,
		direccionEnvioinput,
		direccionesCliente
	) {
		this.modoDirecc = modoDirecc;
		this.valDireccionEnvioSelect = valDireccionEnvioSelect;
		this.direccionEnvioinput = direccionEnvioinput;
		this.direccionesCliente = direccionesCliente;
	}

	getDireccionSegunModoDirecc() {
		let direccionEnvio;
		if (this.modoDirecc === 'select') {
			direccionEnvio = this.constructor.getDireccionSegunValue(
				this.valDireccionEnvioSelect,
				this.direccionesCliente
			);
		} else if (this.modoDirecc === 'input') {
			direccionEnvio = this.direccionEnvioinput;
		}
		return direccionEnvio;
	}

	static getDireccionSegunValue(value, direccionesCliente) {
		const r = direccionesCliente.find((x) => x.id === value);

		const direccion = r.descripcion;

		return direccion;
	}
}

export { Direccion, Envio };
