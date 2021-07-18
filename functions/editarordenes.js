import { TipoEnvio } from './envio';

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
}

class Orden {
	constructor(filaActivaOrden, paramsOrden, tiposEnvio) {
		this.filaActivaOrden = filaActivaOrden;
		this.paramsOrden = paramsOrden;
		this.tiposEnvio = tiposEnvio;
	}

	modificarOrden() {
		const {
			observaciones,
			direccionEnvio,
			tipoEnvioId,
			ptoVentaId,
			tarifaEnvio,
			ordenEstadoId,
		} = this.paramsOrden;

		let ordenMod = { ...this.filaActivaOrden };

		// if (observaciones) {
		// 	ordenMod = {
		// 		...ordenMod,
		// 		observaciones: observaciones,
		// 	};
		// }

		if (direccionEnvio) {
			ordenMod = {
				...ordenMod,
				direccionEnvio: direccionEnvio,
			};
		}

		if (tipoEnvioId) {
			const objTipoEnvio = new TipoEnvio(this.tiposEnvio, tipoEnvioId);

			const tipoEnvioMod = objTipoEnvio.getIdYDescripcion(); // esto deberia estar en la clase TipoEnvio

			ordenMod = {
				...ordenMod,
				TipoEnvio: tipoEnvioMod,
			};
		}

		// if (ptoVentaId) {
		// generar el objeto y luego hacer el reemplazo
		// ordenMod = {
		// 	...ordenMod,
		// 	[PtoVenta.id]: ptoVentaId,
		// };
		// }

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

	// metodo que reemplaza filaActivaOrden en ordenes
	// devuelve ordenes modificada

	// metodo que reciba ordenes formato bd y lo convierta en ordenes formato frontend
}

export { crearFilasTablaEditarOrdenes, modEstadoOrden, Ordenes, Orden };
