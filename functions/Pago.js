class Pago {
	constructor(id, importe, fecha, facturaId, metodoPagoId, usuarioId) {
		this.id = id;
		this.importe = importe;
		this.fecha = fecha;
		this.facturaId = facturaId;
		this.metodoPagoId = metodoPagoId;
		this.usuarioId = usuarioId;
	}
}

class PagoBD extends Pago {
	constructor(pagoBD, id, importe, fecha, facturaId, metodoPagoId, usuarioId) {
		this.id = pagoBD.id;
		this.importe = pagoBD.importe;
		this.fecha = pagoBD.fecha;
		this.facturaId = pagoBD.facturaId;
		this.metodoPagoId = pagoBD.metodoPagoId;
		this.usuarioId = pagoBD.usuarioId;
	}
}

export { Pago, PagoBD };
