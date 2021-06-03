const agregarCarrito = (codigo, ptoStock, lista, filas, carrito) => {
	const productoCarrito = carrito.find((fila) => fila.codigo === codigo);

	// agregar cantidad o agregar al carrito segun corresponda
	if (productoCarrito) {
		const nuevaCantidad = productoCarrito.cantidad + 1;
		const productoModificado = { ...productoCarrito, cantidad: nuevaCantidad };

		const indice = carrito.findIndex((fila) => fila.codigo === codigo);

		carrito.splice(indice, 1, productoModificado);
	} else {
		const producto = filas.find(
			(fila) =>
				fila.ProductoCodigo === codigo &&
				fila.PtoStockId === ptoStock &&
				fila['Producto.Precios.ListaPrecioId'] === lista
		);

		// const productoModificado = { ...producto, cantidad: 1 };
		const productoModificado = {
			codigo: producto.ProductoCodigo,
			descripcion: producto['Producto.descripcion'],
			pu: producto['Producto.Precios.pu'],
			cantidad: 1,
			origen: [
				{
					alias: 'stock',
					ptoStockId: producto.PtoStockId,
					ptoStockDescripcion: producto['PtoStock.descripcion'],
					cantidad: 1,
				},
			],
		};

		carrito.push(productoModificado);
	}

	return carrito;
};

export { agregarCarrito };
