class ModificarArray {
	constructor(array, objeto) {
		this.array = array;
		this.objeto = objeto;
	}

	agregarObjetoEnArray() {
		let arrayMod = [];

		arrayMod = [...this.array];
		arrayMod.push(this.objeto);

		return arrayMod;
	}
}

export { ModificarArray };
