const agregarCarrito = (codigo, ptoStock, lista, filas, carrito) => {
	let producto;
	let productoCarrito;
	let filaOrigen;

	producto = buscarProductoEnStock(filas, codigo, ptoStock, lista);
	productoCarrito = buscarProductoEnCarrito(carrito, codigo);

	const cant = producto.cantidad;

	if (productoCarrito) {
		filaOrigen = traerFilaOrigen(cant, productoCarrito, ptoStock);
	}

	if (!productoCarrito && cant > 0) {
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
	} else if (!productoCarrito && cant <= 0) {
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
	} else if (productoCarrito && cant > 0 && !filaOrigen) {
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
	} else if (productoCarrito && cant > 0 && filaOrigen) {
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
	} else if (productoCarrito && cant <= 0 && !filaOrigen) {
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
	} else if (productoCarrito && cant <= 0 && filaOrigen) {
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
	let stockModificado = { ptoStock: [], stockTotal: [] };

	// resta de stock en puntos de stock
	productoPtoStock = filasPtoStock.find(
		(fila) => fila.ProductoCodigo === codigo && fila.PtoStockId === ptoStock
	);

	const nuevaCantidadPtoStock = parseInt(productoPtoStock.cantidad) + cantidad;
	if (nuevaCantidadPtoStock < 0) {
		stockModificado = { ptoStock: filasPtoStock, stockTotal: filasStockTotal };

		return stockModificado;
	}

	const stockModificadoPtoStock = filasPtoStock.map((fila) =>
		fila.ProductoCodigo === codigo && fila.PtoStockId === ptoStock
			? { ...fila, cantidad: nuevaCantidadPtoStock }
			: fila
	);

	// resta de stock total
	productoStockTotal = filasStockTotal.find(
		(fila) => fila.ProductoCodigo === codigo
	);

	const nuevaCantidadStockTotal =
		parseInt(productoStockTotal.cantidad) + cantidad;
	if (nuevaCantidadStockTotal < 0) {
		stockModificado = { ptoStock: filasPtoStock, stockTotal: filasStockTotal };

		return stockModificado;
	}

	const stockModificadoStockTotal = filasStockTotal.map((fila) =>
		fila.ProductoCodigo === codigo
			? { ...fila, cantidad: nuevaCantidadStockTotal }
			: fila
	);

	stockModificado = {
		ptoStock: stockModificadoPtoStock,
		stockTotal: stockModificadoStockTotal,
	};

	return stockModificado;
};

const quitarProductoCarrito = (carrito, codigo) => {
	let carritoModificado;
	let producto;

	producto = carrito.find((fila) => fila.codigo === codigo);

	carritoModificado = carrito.filter((fila) => fila.codigo !== codigo);

	carrito = [...carritoModificado];

	const resultado = { carrito, producto };
	return resultado;
};

const buscarProductoEnStock = (filas, codigo, ptoStock, lista) => {
	const respuesta = filas.find(
		(fila) =>
			fila.ProductoCodigo === codigo &&
			fila.PtoStockId === ptoStock &&
			fila['Producto.Precios.ListaPrecioId'] === lista
	);
	return respuesta;
};

// busca el codigo en el carrito
const buscarProductoEnCarrito = (carrito, codigo) => {
	const respuesta = carrito.find((fila) => fila.codigo === codigo);
	return respuesta;
};

const traerFilaOrigen = (cantidad, productoCarrito, ptoStock) => {
	let respuesta;
	if (cantidad > 0) {
		respuesta = productoCarrito.origen.find(
			(fila) => fila.ptoStockId === ptoStock
		);
	} else {
		respuesta = productoCarrito.origen.find((fila) => fila.ptoStockId === 0);
	}
	return respuesta;
};

export { agregarCarrito, restaCantidadEnStock, quitarProductoCarrito };
