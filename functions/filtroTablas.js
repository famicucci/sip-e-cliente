// filtra las filas segun la búsqueda
function filtrado(filas, busqueda) {
	const busquedaMayus = busqueda.toLowerCase();

	const rowsFiltradas = filas.filter(
		(row) =>
			Object.values(row).join().toLowerCase().indexOf(busquedaMayus) !== -1
	);

	return rowsFiltradas;
}

// filtra segun la lista de precio
function filtraListaPrecio(filas, lista) {
	const rowsFiltradas = filas.filter((row) => row.ListaPrecioId === lista);
	return rowsFiltradas;
}

// filtra segun el punto de stock
const filtraPuntoStock = (filas, puntoStock) => {
	const rowsFiltradas = filas.filter((fila) => fila.PtoStockId === puntoStock);
	return rowsFiltradas;
};

export { filtrado, filtraListaPrecio, filtraPuntoStock };
