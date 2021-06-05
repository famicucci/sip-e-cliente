const agregarCarrito = (codigo, ptoStock, lista, filas, carrito) => {
	let producto;
	let productoCarrito;
	let filaOrigen;

	// busca el codigo en las filas
	producto = filas.find(
		(fila) =>
			fila.ProductoCodigo === codigo &&
			fila.PtoStockId === ptoStock &&
			fila['Producto.Precios.ListaPrecioId'] === lista
	);
	// busca el codigo en el carrito
	productoCarrito = carrito.find((fila) => fila.codigo === codigo);

	if (productoCarrito && producto.cantidad > 0) {
		// revisa si existe el pto stock
		filaOrigen = productoCarrito.origen.find(
			(fila) => fila.ptoStockId === ptoStock
		);
	} else if (productoCarrito && producto.cantidad <= 0) {
		// revisa si existe la fila origen producción
		filaOrigen = productoCarrito.origen.find((fila) => fila.ptoStockId === 0);
	}

	if (!productoCarrito && producto.cantidad > 0) {
		productoCarrito = {
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
		carrito.push(productoCarrito);
	} else if (!productoCarrito && producto.cantidad <= 0) {
		productoCarrito = {
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
		carrito.push(productoCarrito);
	} else if (productoCarrito && producto.cantidad > 0 && !filaOrigen) {
		const nuevoOrigen = {
			alias: 'stock',
			ptoStockId: producto.PtoStockId,
			ptoStockDescripcion: producto['PtoStock.descripcion'],
			cantidad: 1,
		};
		productoCarrito.origen.push(nuevoOrigen);

		const nuevaCantidadProducto = productoCarrito.cantidad + 1;
		productoCarrito = { ...productoCarrito, cantidad: nuevaCantidadProducto };

		// sobreescribe carrito
		const carritoModificado = carrito.map((fila) =>
			fila.codigo === productoCarrito.codigo ? productoCarrito : fila
		);

		carrito = [...carritoModificado];
	} else if (productoCarrito && producto.cantidad > 0 && filaOrigen) {
		const cantidad = filaOrigen.cantidad + 1;
		filaOrigen = {
			...filaOrigen,
			cantidad: cantidad,
		};

		const origenModificado = productoCarrito.origen.map((fila) =>
			fila.ptoStockId === ptoStock ? filaOrigen : fila
		);

		productoCarrito = {
			...productoCarrito,
			origen: origenModificado,
		};

		const nuevaCantidadProducto = productoCarrito.cantidad + 1;
		productoCarrito = { ...productoCarrito, cantidad: nuevaCantidadProducto };

		// sobreescribe carrito
		const carritoModificado = carrito.map((fila) =>
			fila.codigo === productoCarrito.codigo ? productoCarrito : fila
		);

		carrito = [...carritoModificado];
	} else if (productoCarrito && producto.cantidad <= 0 && !filaOrigen) {
		const nuevoOrigen = {
			alias: 'produccion',
			ptoStockId: 0,
			ptoStockDescripcion: 'produccion',
			cantidad: 1,
		};
		productoCarrito.origen.push(nuevoOrigen);

		const nuevaCantidadProducto = productoCarrito.cantidad + 1;
		productoCarrito = { ...productoCarrito, cantidad: nuevaCantidadProducto };

		// sobreescribe carrito
		const carritoModificado = carrito.map((fila) =>
			fila.codigo === productoCarrito.codigo ? productoCarrito : fila
		);

		carrito = [...carritoModificado];
	} else if (productoCarrito && producto.cantidad <= 0 && filaOrigen) {
		const cantidad = filaOrigen.cantidad + 1;
		filaOrigen = {
			...filaOrigen,
			cantidad: cantidad,
		};

		const origenModificado = productoCarrito.origen.map((fila) =>
			fila.ptoStockId === 0 ? filaOrigen : fila
		);

		productoCarrito = {
			...productoCarrito,
			origen: origenModificado,
		};

		const nuevaCantidadProducto = productoCarrito.cantidad + 1;
		productoCarrito = { ...productoCarrito, cantidad: nuevaCantidadProducto };

		// sobreescribe carrito
		const carritoModificado = carrito.map((fila) =>
			fila.codigo === productoCarrito.codigo ? productoCarrito : fila
		);

		carrito = [...carritoModificado];
	}

	return carrito;
};

const restaCantidadEnStock = (
	codigo,
	ptoStock,
	filasPtoStock,
	filasStockTotal,
	cantidad
) => {
	let productoPtoStock;
	let productoStockTotal;

	// resta de stock en puntos de stock
	productoPtoStock = filasPtoStock.find(
		(fila) => fila.ProductoCodigo === codigo && fila.PtoStockId === ptoStock
	);

	const nuevaCantidadPtoStock = productoPtoStock.cantidad - cantidad;

	const stockModificadoPtoStock = filasPtoStock.map((fila) =>
		fila.ProductoCodigo === codigo && fila.PtoStockId === ptoStock
			? { ...fila, cantidad: nuevaCantidadPtoStock }
			: fila
	);

	// resta de stock total
	productoStockTotal = filasStockTotal.find(
		(fila) => fila.ProductoCodigo === codigo
	);

	const nuevaCantidadStockTotal = productoStockTotal.cantidad - cantidad;

	const stockModificadoStockTotal = filasStockTotal.map((fila) =>
		fila.ProductoCodigo === codigo
			? { ...fila, cantidad: nuevaCantidadStockTotal }
			: fila
	);

	const stockModificado = {
		ptoStock: stockModificadoPtoStock,
		stockTotal: stockModificadoStockTotal,
	};

	return stockModificado;
};

export { agregarCarrito, restaCantidadEnStock };
