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
		observaciones
	) {
		this.id = id;
		this.importe = importe;
		this.descuento = descuento;
		this.tarifaEnvio = tarifaEnvio;
		this.importeFinal = importeFinal;
		this.observaciones = observaciones;
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
		observaciones
	) {
		super(id, importe, descuento, tarifaEnvio, importeFinal, observaciones);
		this.id = facturaBD.id;
		this.importe = facturaBD.importe;
		this.descuento = facturaBD.descuento;
		this.tarifaEnvio = facturaBD.tarifaEnvio;
		this.importeFinal = facturaBD.importeFinal;
		this.observaciones = facturaBD.observaciones;
	}
}

export { Factura, FacturaBD, DetalleFactura };
