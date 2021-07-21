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

export { DetalleFactura };
