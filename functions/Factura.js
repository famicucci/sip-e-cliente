class DetalleFactura {
	static crearDetalleFactura(detalleOrden) {
		const detalleFactura = detalleOrden.map((x) => ({
			cantidad: x.cantidad,
			pu: x.pu,
			ProductoCodigo: x.ProductoCodigo,
		}));

		return detalleFactura;
	}
}

class Factura {
	constructor(
		id,
		importe,
		descuento,
		tarifaEnvio,
		importeFinal,
		observaciones,
		pagos
	) {
		this.id = id;
		this.importe = importe;
		this.descuento = descuento;
		this.tarifaEnvio = tarifaEnvio;
		this.importeFinal = importeFinal;
		this.observaciones = observaciones;
		this.pagos = pagos;
	}

	sumaPagos() {
		const arraySuma = this.pagos.map((x) => parseFloat(x.importe));
		const resultado = arraySuma.reduce((acc, el) => acc + el, 0);
		return resultado;
	}
}

class FacturaBD extends Factura {
	constructor(
		facturaBD,
		id,
		importe,
		descuento,
		tarifaEnvio,
		importeFinal,
		observaciones,
		pagos
	) {
		super(id, importe, descuento, tarifaEnvio, importeFinal, observaciones);
		this.id = facturaBD.id;
		this.importe = facturaBD.importe;
		this.descuento = facturaBD.descuento;
		this.tarifaEnvio = facturaBD.tarifaEnvio;
		this.importeFinal = facturaBD.importeFinal;
		this.observaciones = facturaBD.observaciones;
		this.pagos = facturaBD.Pagos;
	}
}

export { Factura, FacturaBD, DetalleFactura };
