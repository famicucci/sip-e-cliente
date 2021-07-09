const crearFilasTablaEditarOrdenes = (arrayFilas) => {
	let filasTablaOrdenes = arrayFilas.map((x) => ({
		idOrden: x.id,
		ordenEstado: x.OrdenEstado.descripcion,
		ordenEstadoId: x.OrdenEstado.id,
		nombreCliente: x.Cliente.nombre,
		apellidoCliente: x.Cliente.apellido,
		fecha: x.createdAt,
		idFactura: x.Facturas.length > 0 ? x.Facturas[0].id : null,
		estadoPago: x.Facturas.length > 0 ? x.Facturas[0].estadoPago : null,
		tipoEnvio: x.TipoEnvio.descripcion,
		observaciones: x.observaciones,
	}));
	return filasTablaOrdenes;
};

const modEstadoOrden = (ordenes, ordenId, value, descripcion) => {
	const r = ordenes.map((x) =>
		x.id === ordenId
			? { ...x, OrdenEstado: { id: value, descripcion: descripcion } }
			: x
	);
	return r;
};

export { crearFilasTablaEditarOrdenes, modEstadoOrden };
