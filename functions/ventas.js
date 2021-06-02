const agregarCarrito = (codigo, ptoStock, lista, filas) => {
	const producto = filas.filter(
		(fila) =>
			fila.ProductoCodigo === codigo &&
			fila.PtoStockId === ptoStock &&
			fila['Producto.Precios.ListaPrecioId'] === lista
	);

	const objeto = producto[0];
	const productoModificado = { ...objeto, cantidad: 1 };

	return productoModificado;
};

export { agregarCarrito };
