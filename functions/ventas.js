// carga el producto al carrito
const agregarCarrito = (
	codigo,
	ptoStock,
	arrayPtosStock,
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
	const ptoStockDescripcion = detPtoStockDescripcion(ptoStock, arrayPtosStock);

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
		const origen = modCantPtoStockProdCarr_var(
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
const detPtoStockDescripcion = (ptoStock, arrayPtosStock) => {
	let ptoStockDescripcion;
	if (ptoStock) {
		const r = arrayPtosStock.find((x) => x.id === ptoStock);
		ptoStockDescripcion = r.descripcion;
	} else {
		ptoStockDescripcion = 'Producción';
	}

	return ptoStockDescripcion;
};

// modifica la cantidad en el punto de stock dado (delta)
const modCantPtoStockProdCarr_var = (
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

const modCantStockTotal = (cod, arrayStockTotal, cantVar) => {
	// traer cantidad actual total
	const cantStock = buscarProdStockTotal(cod, arrayStockTotal).cantidad;

	const nuevaCant = cantStock - cantVar;

	const r = arrayStockTotal.map((x) =>
		x.ProductoCodigo === cod ? { ...x, cantidad: nuevaCant } : x
	);

	return r;
};

const buscarProdStockTotal = (cod, arrayStockTotal) => {
	const r = arrayStockTotal.find((x) => x.ProductoCodigo === cod);
	return r;
};

const modCantPtoStock = (cod, ptoStock, arrayPtoStock, cantVar) => {
	if (ptoStock === 0) return arrayPtoStock;

	// traer cantidad actual en el pto de stock
	const cantStock = buscarProdPtoStock(cod, ptoStock, arrayPtoStock).cantidad;

	const nuevaCant = cantStock - cantVar;

	// devuelve error si la cantidad es negativa
	if (nuevaCant < 0) return 'error';

	const r = arrayPtoStock.map((x) =>
		x.ProductoCodigo === cod && x.PtoStockId === ptoStock
			? { ...x, cantidad: nuevaCant }
			: x
	);

	return r;
};

// toma producto anterior, nuevo producto, codigo, ptoStock y calcula cuanto varió la cantidad
const cantVarPtoStockProdCarr = (prod, prodMod, ptoStock) => {
	const cantAct = buscarPtoStockProdCarr(prod.origen, ptoStock).cantidad;
	const cantMod = buscarPtoStockProdCarr(prodMod.origen, ptoStock).cantidad;

	const r = cantMod - cantAct;

	return r;
};

const buscarProdPtoStock = (codigo, ptoStock, arrayPtoStock) => {
	const r = arrayPtoStock.find(
		(x) => x.ProductoCodigo === codigo && x.PtoStockId === ptoStock
	);
	return r;
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

// modifica la cantidad en el punto de stock dado (cant. final)
const modCantPtoStockProdCarr_final = (productoCarrito, ptoStock, canFinal) => {
	// buscar producto en carrito
	let origen = productoCarrito.origen;
	let filaOrigen = buscarPtoStockProdCarr(origen, ptoStock);

	filaOrigen = {
		...filaOrigen,
		cantidad: parseInt(canFinal),
	};

	const origenModificado = origen.map((x) =>
		x.ptoStockId === ptoStock ? filaOrigen : x
	);
	origen = origenModificado;

	return origen;
};

const buscarPtoStockProdCarr = (origen, ptoStock) => {
	const r = origen.find((x) => x.ptoStockId === ptoStock);
	return r;
};

const modProdCarr = (
	carr,
	cod,
	ptoStock,
	cant,
	arrayPtoStock,
	arrayStockTotal
) => {
	const prod = buscarProductoEnCarrito(carr, cod);
	const nuevoOrigen = modCantPtoStockProdCarr_final(prod, ptoStock, cant);
	const total = cantTotalProdCarr(nuevoOrigen);
	let prodMod = modCantTotProdCarr(prod, total);
	prodMod = modOrigenProCarr(prodMod, nuevoOrigen);
	const carrMod = modificarCarrito(carr, prodMod);

	// función que devuelva el delta cantidad
	const cantVar = cantVarPtoStockProdCarr(prod, prodMod, ptoStock);

	// estas funciones me devuelven el stock modificado
	const ptoStockMod = modCantPtoStock(cod, ptoStock, arrayPtoStock, cantVar);
	const stockTotalMod = modCantStockTotal(cod, arrayStockTotal, cantVar);

	const detMsg = () => {
		let r;
		if (ptoStockMod === 'error') {
			r = 'No hay más unidades en este punto de stock!';
		} else if (cant < 0) {
			r = 'La cantidad no puede ser negativa!';
		}
		return r;
	};

	const msg = detMsg();

	// si la nueva cantidad en ptoStockMod da negativo debo retornar carr, ptoStockMod, stockTotalMod sin modificaciones
	if (ptoStockMod === 'error' || cant < 0) {
		return {
			carrMod: carr,
			ptoStockMod: arrayPtoStock,
			stockTotalMod: arrayStockTotal,
			msg: {
				msg: msg,
				categoria: 'error',
			},
		};
	}

	return {
		carrMod,
		ptoStockMod,
		stockTotalMod,
		msg: null,
	};
};

export {
	agregarCarrito,
	modCantStock,
	quitarProductoCarrito,
	modProdCarr,
	buscarProdPtoStock,
};
