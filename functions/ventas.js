// carga el producto al carrito
const agregarCarrito = (
	codigo,
	ptoStock,
	lista,
	preciosStockTotal,
	carrito
) => {
	let producto;
	let productoCarrito;

	producto = traeInfoProd(preciosStockTotal, codigo, lista);
	productoCarrito = buscarProductoEnCarrito(carrito, codigo);

	// pone el pto de stock id cero si no hay mas stock del producto
	ptoStock = detPtoStock(ptoStock);
	const ptoStockDescripcion = detPtoStockDescripcion(producto, ptoStock);

	if (!productoCarrito) {
		productoCarrito = crearProductoCarrito(
			codigo,
			producto['Producto.descripcion'],
			producto['Producto.Precios.pu'],
			1,
			ptoStock,
			ptoStockDescripcion,
			1
		);
		carrito.push(productoCarrito);
	} else if (productoCarrito) {
		// modificar la cantidad en la fila origen que corresponde
		const origen = modCantPtoStockProdCarr(
			productoCarrito,
			ptoStock,
			ptoStockDescripcion,
			1
		);

		const total = cantTotalProdCarr(origen);
		productoCarrito = modCantTotProdCarr(productoCarrito, total);
		productoCarrito = modOrigenProCarr(productoCarrito, origen);
		carrito = modificarCarrito(carrito, productoCarrito);
	}
	return carrito;
};

const traeInfoProd = (filas, codigo, lista) => {
	let r = filas.find(
		(fila) =>
			fila.ProductoCodigo === codigo &&
			fila['Producto.Precios.ListaPrecioId'] === lista
	);

	return r;
};

// busca el codigo en el carrito
const buscarProductoEnCarrito = (carrito, codigo) => {
	const respuesta = carrito.find((fila) => fila.codigo === codigo);
	return respuesta;
};

const crearProductoCarrito = (
	codigo,
	descripcion,
	precio,
	cantTotal,
	ptoStockId,
	ptoStockDescripcion,
	cantOrigen
) => {
	return {
		codigo: codigo,
		descripcion: descripcion,
		pu: precio,
		cantidad: cantTotal,
		origen: [
			{
				ptoStockId: ptoStockId,
				ptoStockDescripcion: ptoStockDescripcion,
				cantidad: cantOrigen,
			},
		],
	};
};

// devuelve el punto de stock 0 si no hay mas stock del producto
const detPtoStock = (ptoStock) => {
	if (!ptoStock) {
		ptoStock = 0;
	}
	return ptoStock;
};

// devuelve la descripcion del punto de stock segun corresponda al producto
const detPtoStockDescripcion = (producto, ptoStock) => {
	let ptoStockDescripcion;
	if (!ptoStock) {
		ptoStockDescripcion = 'Producción';
	} else {
		ptoStockDescripcion = producto['PtoStock.descripcion'];
	}

	return ptoStockDescripcion;
};

// modifica la cantidad en el punto de stock dado
const modCantPtoStockProdCarr = (
	productoCarrito,
	ptoStock,
	ptoStockDescripcion,
	cantVar
) => {
	let origen = productoCarrito.origen;
	let filaOrigen = origen.find((x) => x.ptoStockId === ptoStock);

	if (filaOrigen) {
		const nuevaCant = filaOrigen.cantidad + cantVar;
		filaOrigen = { ...filaOrigen, cantidad: nuevaCant };

		const origenModificado = origen.map((x) =>
			x.ptoStockId === ptoStock ? filaOrigen : x
		);
		origen = origenModificado;
	} else {
		filaOrigen = crearOrigen(ptoStock, ptoStockDescripcion, cantVar);
		origen.push(filaOrigen);
	}

	return origen;
};

const crearOrigen = (ptoStockId, ptoStockDescripcion, cantidad) => {
	return {
		ptoStockId,
		ptoStockDescripcion,
		cantidad,
	};
};

// calcula la cantidad total del producto
const cantTotalProdCarr = (filasOrigen) => {
	const arrayCantidades = filasOrigen.map((fila) => fila.cantidad);
	const total = arrayCantidades.reduce((acc, el) => acc + el, 0);

	return total;
};

const modificarCarrito = (arrayProductos, producto) => {
	const x = arrayProductos.map((fila) =>
		fila.codigo === producto.codigo ? producto : fila
	);

	return x;
};

const modOrigenProCarr = (producto, origen) => {
	producto = { ...producto, origen: origen };

	return producto;
};

// funcion que reemplaza el actual total por el que viene
const modCantTotProdCarr = (prod, tot) => {
	const r = { ...prod, cantidad: tot };
	return r;
};

// saca el producto del stock
const modCantStock = (
	codigo,
	ptoStock,
	filasPtoStock,
	filasStockTotal,
	cantidad
) => {
	let productoPtoStock;
	let productoStockTotal;
	let stockModificado = {
		ptoStock: filasPtoStock,
		stockTotal: filasStockTotal,
	};

	ptoStock = detPtoStock(ptoStock);
	if (ptoStock === 0) return stockModificado;

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

// esto creo que es la funcion que usan los inputs
const modCantProdCarr = (
	carrito,
	codigoProducto,
	ptoStock,
	cantidad,
	filasPtoStock,
	listaPrecio
) => {
	// buscar codigo en carrito
	const producto = buscarProductoEnCarrito(carrito, codigoProducto);
	let filaOrigen = traerFilaOrigen(99, producto, ptoStock);
	filaOrigen = {
		...filaOrigen,
		cantidad: parseInt(cantidad),
	};

	// modificar el producto correspondiente con la nueva cantidad
	const cantStock = buscarProductoEnStock(
		filasPtoStock,
		codigoProducto,
		ptoStock,
		listaPrecio
	).cantidad;

	const productoCarrito = modProdCarr(producto, filaOrigen, cantStock, {
		cantFinal: parseInt(cantidad),
	});

	carrito = modificarCarrito(carrito, productoCarrito);

	return carrito;
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

export { agregarCarrito, modCantStock, quitarProductoCarrito, modCantProdCarr };
