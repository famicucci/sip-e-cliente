class Direccion {
	constructor(direcciones, valActualSelect) {
		this.direcciones = direcciones;
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

export { Direccion };
