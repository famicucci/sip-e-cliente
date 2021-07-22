import { TipoEnvio } from './envio';

const crearFilasTablaEditarOrdenes = (arrayFilas) => {
	let filasTablaOrdenes = arrayFilas.map((x) => ({
		idOrden: x.id,
		ordenEstado: x.OrdenEstado.descripcion,
		ordenEstadoId: x.OrdenEstado.id,
		nombreCliente: x.Cliente.nombre,
		apellidoCliente: x.Cliente.apellido,
		fecha: x.createdAt,
		idFactura: x.Factura ? x.Factura.id : null,
		estadoPago: x.Factura ? x.Factura.estadoPago : null,
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

class Ordenes {
	constructor(ordenes, orden) {
		this.ordenes = ordenes;
		this.orden = orden;
	}

	modOrdenes() {
		const ordenesMod = this.ordenes.map((x) =>
			x.id === this.orden.id ? this.orden : x
		);

		return ordenesMod;
	}

	getOrden() {
		const orden = this.ordenes.find((x) =>
			x.id === this.orden ? this.orden : null
		);

		return orden;
	}

	// metodo que reciba ordenes formato bd y lo convierta en ordenes formato frontend
}

class Orden {
	constructor(filaActivaOrden, paramsOrden, tiposEnvio, ptosVenta) {
		this.filaActivaOrden = filaActivaOrden;
		this.paramsOrden = paramsOrden;
		this.tiposEnvio = tiposEnvio;
		this.ptosVenta = ptosVenta;
	}

	modificarOrden() {
		const {
			observaciones,
			direccionEnvio,
			tipoEnvioId,
			PtoVentaId,
			tarifaEnvio,
			ordenEstadoId,
		} = this.paramsOrden;

		let ordenMod = { ...this.filaActivaOrden };

		if (observaciones) {
			ordenMod = {
				...ordenMod,
				observaciones: observaciones,
			};
		}

		if (direccionEnvio) {
			ordenMod = {
				...ordenMod,
				direccionEnvio: direccionEnvio,
			};
		}

		if (tipoEnvioId) {
			const objTipoEnvio = new TipoEnvio(this.tiposEnvio, tipoEnvioId);

			const tipoEnvioMod = objTipoEnvio.getIdYDescripcion();

			ordenMod = {
				...ordenMod,
				TipoEnvio: tipoEnvioMod,
			};
		}

		if (PtoVentaId) {
			const objPtoVenta = new PtoVenta(this.ptosVenta, PtoVentaId);

			const ptoVentaMod = objPtoVenta.getIdYDescripcion();

			ordenMod = {
				...ordenMod,
				PtoVenta: ptoVentaMod,
			};
		}

		if (tarifaEnvio) {
			ordenMod = {
				...ordenMod,
				tarifaEnvio: tarifaEnvio,
			};
		}

		// if (ordenEstadoId) {
		// generar el objeto y luego hacer el reemplazo
		// ordenMod = {
		// 	...ordenMod,
		// 	[OrdenEstado.id]: ordenEstadoId,
		// };
		// }
		return ordenMod;
	}

	modFactura() {
		console.log(this.filaActivaOrden);
		console.log(this.paramsOrden);
		console.log(this.tiposEnvio);
	}
}

class DetalleOrden {
	constructor(detalleOrden) {
		this.detalleOrden = detalleOrden;
	}

	subtotal() {
		const arraySuma = this.detalleOrden.map((x) => x.cantidad * x.pu);
		const resultado = arraySuma.reduce((acc, el) => acc + el, 0);

		return resultado;
	}
}

class PtoVenta {
	constructor(ptosVenta, ptoVentaId) {
		this.ptosVenta = ptosVenta;
		this.ptoVentaId = ptoVentaId;
	}

	getIdYDescripcion() {
		let ptoVenta = this.ptosVenta.find((x) => x.id === this.ptoVentaId);

		ptoVenta = { id: ptoVenta.id, descripcion: ptoVenta.descripcion };

		return ptoVenta;
	}

	// getDescripcion() {
	// 	const r = this.getIdYDescripcion();

	// 	const descripcion = r.descripcion;

	// 	return descripcion;
	// }
}

export {
	crearFilasTablaEditarOrdenes,
	modEstadoOrden,
	Ordenes,
	Orden,
	DetalleOrden,
	PtoVenta,
};
