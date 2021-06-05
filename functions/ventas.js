const agregarCarrito = (codigo, ptoStock, lista, filas, carrito) => {
	const producto = filas.find(
		(fila) =>
			fila.ProductoCodigo === codigo &&
			fila.PtoStockId === ptoStock &&
			fila['Producto.Precios.ListaPrecioId'] === lista
	);

	const productoCarrito = carrito.find((fila) => fila.codigo === codigo);

	let productoModificado = {};
	// agregar cantidad o agregar al carrito segun corresponda
	if (productoCarrito) {
		const nuevaCantidad = productoCarrito.cantidad + 1;
		productoModificado = { ...productoCarrito, cantidad: nuevaCantidad };

		// revisa si el pto stock ya existe
		const filaOrigen = productoModificado.origen.find(
			(fila) => fila.ptoStockId === ptoStock
		);

		// trae el origen actual del producto
		const origenProductoModificado = productoModificado.origen;

		if (filaOrigen) {
			// si existe calcula nueva cantidad
			const nuevaCantidad = filaOrigen.cantidad + 1;
			const filaOrigenModificada = {
				...filaOrigen,
				cantidad: nuevaCantidad,
			};

			const origenModificado = origenProductoModificado.map((fila) =>
				fila.ptoStockId === ptoStock ? filaOrigenModificada : fila
			);

			productoModificado = {
				...productoModificado,
				origen: origenModificado,
			};
		} else {
			const nuevoOrigen = {
				alias: 'stock',
				ptoStockId: producto.PtoStockId,
				ptoStockDescripcion: producto['PtoStock.descripcion'],
				cantidad: 1,
			};

			const origenProductoModificado = productoModificado['origen'];
			origenProductoModificado.push(nuevoOrigen);
		}

		// sobreescribe carrito
		const carritoModificado = carrito.map((fila) =>
			fila.codigo === productoModificado.codigo ? productoModificado : fila
		);

		carrito = [...carritoModificado];
	} else {
		if (producto.cantidad > 0) {
			productoModificado = {
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
		} else {
			productoModificado = {
				codigo: producto.ProductoCodigo,
				descripcion: producto['Producto.descripcion'],
				pu: producto['Producto.Precios.pu'],
				cantidad: 1,
				origen: [
					{
						alias: 'produccion',
						ptoStockId: 0,
						ptoStockDescripcion: 'produccion',
						cantidad: 1,
					},
				],
			};
			carrito.push(productoModificado);
		}
	}

	return carrito;
};

export { agregarCarrito };
