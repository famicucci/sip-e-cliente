const filtraElegirPtoStock = (filas, codigoProducto, lista) => {
	const filasFiltradas = filas.filter(
		(fila) =>
			fila.ProductoCodigo === codigoProducto &&
			fila['Producto.Precios.ListaPrecioId'] === lista
	);

	return filasFiltradas;
};

const filtraProducto = (filas, codigoProducto) => {
	const fila = filas.find((fila) => fila.codigo === codigoProducto);

	return fila;
};

const filtro = (arrayProd, { lisPre, ptoStock, bus }) => {
	let r = arrayProd;

	// compruebo que el array venga lleno, sino no hay nada que filtrar
	if (r.length === 0) return r;

	// si no existe la propiedad en los objetos del array anulo ptoStock
	if (ptoStock && !arrayProd[0].hasOwnProperty('PtoStockId')) ptoStock = null;

	// filtrar el array segun la lista
	if (lisPre && !ptoStock) {
		// revisa cual es el nombre d ela propiedad
		if (arrayProd[0].hasOwnProperty('ListaPrecioId')) {
			r = arrayProd.filter((x) => x.ListaPrecioId === lisPre);
		} else if (arrayProd[0].hasOwnProperty('Producto.Precios.ListaPrecioId')) {
			r = arrayProd.filter(
				(x) => x['Producto.Precios.ListaPrecioId'] === lisPre
			);
		}
	}

	// filtrar el array segun pto stock
	if (!lisPre && ptoStock) {
		r = arrayProd.filter((x) => x.PtoStockId === ptoStock);
	}

	if (lisPre && ptoStock) {
		r = arrayProd.filter(
			(x) =>
				x['Producto.Precios.ListaPrecioId'] === lisPre &&
				x.PtoStockId === ptoStock
		);
	}

	if (bus) {
		r = filBus(r, bus);
	}

	return r;
};

// filtra las filas segun la búsqueda
const filBus = (fil, bus) => {
	const busMod = bus.toLowerCase().replace(/\s+/g, '');

	const r = fil.filter(
		(x) =>
			Object.values(x)
				.join()
				.replace(/\s+/g, '')
				.toLowerCase()
				.indexOf(busMod) !== -1
	);

	return r;
};

// funcion que reciba el arrayPtoStock y arrayStockTotal y el value del radio. En base a eso la funcion decide que array usar. Luego aplica filtro
const detArrayPrecios = (arrayPtoStock, arrayStockTotal, valTipo) => {
	let arrayPre;
	if (valTipo === 'pto-stock') {
		arrayPre = arrayPtoStock;
		arrayPre = traerProdConStock(arrayPre);
	} else if (valTipo === 'total') {
		arrayPre = arrayStockTotal;
		arrayPre = traerProdConStock(arrayPre);
	} else if (valTipo === 'sin-stock') {
		arrayPre = arrayStockTotal;
		arrayPre = traerProdSinStock(arrayPre);
	}

	return arrayPre;
};

// funcion que separe productos con cant cero de productos con cant mayor a cero
const traerProdSinStock = (arrayProd) => {
	const r = arrayProd.filter((x) => parseFloat(x.cantidad) === 0);
	return r;
};

const traerProdConStock = (arrayProd) => {
	const r = arrayProd.filter((x) => x.cantidad > 0);
	return r;
};

export { filtraElegirPtoStock, filtraProducto, filtro, detArrayPrecios };
