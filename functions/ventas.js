const agregarCarrito = (codigo, ptoStock, lista, filas, carrito) => {
	const productoCarrito = carrito.find(
		(fila) => fila.ProductoCodigo === codigo
	);

	// agregar cantidad o agregar al carrito segun corresponda
	if (productoCarrito) {
		const nuevaCantidad = productoCarrito.cantidad + 1;
		const productoModificado = { ...productoCarrito, cantidad: nuevaCantidad };

		const indice = carrito.findIndex((fila) => fila.ProductoCodigo === codigo);

		carrito.splice(indice, 1, productoModificado);
	} else {
		const producto = filas.find(
			(fila) =>
				fila.ProductoCodigo === codigo &&
				fila.PtoStockId === ptoStock &&
				fila['Producto.Precios.ListaPrecioId'] === lista
		);

		const productoModificado = { ...producto, cantidad: 1 };

		carrito.push(productoModificado);
	}
	console.log(carrito);
	return carrito;
};

export { agregarCarrito };
