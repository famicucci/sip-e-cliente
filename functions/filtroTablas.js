// filtra las filas segun la búsqueda
function filtrado(filas, busqueda) {
	const busquedaMayus = busqueda.toLowerCase();

	const rowsFiltradas = filas.filter(
		(row) =>
			Object.values(row).join().toLowerCase().indexOf(busquedaMayus) !== -1
	);

	return rowsFiltradas;
}

// filtra segun el punto de stock
const filtraPuntoStock = (filas, puntoStock) => {
	const rowsFiltradas = filas.filter((fila) => fila.PtoStockId === puntoStock);
	return rowsFiltradas;
};

// filtra por punto de stock y lista precio
const filtraPtoStockListaPrecio = (filas, ptoStock, lista) => {
	const filasFiltradas = filas.filter(
		(fila) =>
			fila['Producto.Precios.ListaPrecioId'] === lista &&
			fila.PtoStockId === ptoStock &&
			fila.cantidad !== 0
	);

	return filasFiltradas;
};

// filtra por punto de stock y lista precio
const filtraStockTotalListaPrecio = (filas, lista) => {
	const filasFiltradas = filas.filter(
		(fila) =>
			fila['Producto.Precios.ListaPrecioId'] === lista &&
			fila.cantidad !== '0' &&
			fila.cantidad !== 0
	);

	return filasFiltradas;
};

const filtraProductosSinStock = (filas, lista) => {
	const filasFiltradas = filas.filter(
		(fila) =>
			fila['Producto.Precios.ListaPrecioId'] === lista &&
			(fila.cantidad === '0' || fila.cantidad === 0)
	);

	return filasFiltradas;
};

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

// funcion que reciba lista de precio, busqueda y arrayproductos y devuelva el array filtrado
const filtro = (arrayProd, lisPre, bus) => {
	let r = [];
	// filtrar el array segun la lista
	r = arrayProd.filter((x) => x.ListaPrecioId === lisPre);

	if (bus !== null) {
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

export {
	filtrado,
	filtraPuntoStock,
	filtraPtoStockListaPrecio,
	filtraStockTotalListaPrecio,
	filtraElegirPtoStock,
	filtraProductosSinStock,
	filtraProducto,
	filtro,
};
