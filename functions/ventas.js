// carga el producto al carrito
const agregarCarrito = (
	codigo,
	ptoStock,
	arrayPtosStock,
	lista,
	modo,
	preciosStockTotal,
	carrito
) => {
	let producto;
	let productoCarrito;

	producto = traeInfoProd(preciosStockTotal, codigo, lista);
	productoCarrito = buscarProdCarr(carrito, codigo);

	// pone el pto de stock id cero si no hay mas stock del producto
	ptoStock = detPtoStock(ptoStock);
	const ptoStockDescripcion = detPtoStockDescripcion(ptoStock, arrayPtosStock);

	// en modo lector no agrega a producción
	if (ptoStock === 0 && modo === 'lector') return 'error';

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
const buscarProdCarr = (carrito, codigo) => {
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
	const tot = sumValores(arrayCantidades);

	return tot;
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

// hacer una funcion que agregue un producto al carrito, saque la cantidad del stock, controle si el codigo ingresado existe y controle si se encuentra disponible en el pto de stock indicado
const prodCarr = (
	cod,
	ptoStock,
	lis,
	modo,
	arrayPtosStock,
	arrayPtoStock,
	arrayStockTotal,
	carr
) => {
	let r = { arrayPtoStock, arrayStockTotal, carr };

	// controlar si el producto existe en el array
	const prod = buscarProdStockTotal(cod, arrayStockTotal);

	if (!prod) {
		r = {
			...r,
			msg: {
				msg: 'El código ingresado no existe!',
				categoria: 'error',
			},
		};
		return r;
	}

	// controlar si el producto tiene unidades disponibles en el punto de stock indicado
	const prodPtoStock = buscarProdPtoStock(cod, ptoStock, arrayPtoStock);
	if (prodPtoStock) {
		if (prodPtoStock.cantidad === 0) {
			r = {
				...r,
				msg: {
					msg: 'El producto no tiene cantidad disponible en este punto de stock!',
					categoria: 'error',
				},
			};
			return r;
		}
	}

	// si la cantidad total es cero el pto stock id es cero
	if (parseInt(prod.cantidad) === 0) {
		ptoStock = 0;
	}

	// quitar una unidad del pto stock y del stock total
	if (ptoStock !== 0) {
		arrayPtoStock = modCantPtoStock(cod, ptoStock, arrayPtoStock, 1);
		arrayStockTotal = modCantStockTotal(cod, arrayStockTotal, 1);
	}

	carr = agregarCarrito(
		cod,
		ptoStock,
		arrayPtosStock,
		lis,
		modo,
		arrayStockTotal,
		carr
	);

	if (carr === 'error') {
		r = {
			...r,
			msg: {
				msg: 'El producto no tiene cantidad disponible!',
				categoria: 'error',
			},
		};
		return r;
	}

	r = {
		arrayPtoStock: arrayPtoStock,
		arrayStockTotal: arrayStockTotal,
		carr: carr,
		msg: null,
	};

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

	// devuelve error si la cantidad es negativa
	if (nuevaCant < 0) return 'error';

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

	// array con la cantidad modificada
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

const quitarProductoCarrito = (carr, cod) => {
	// para devolver el producto eliminado en el return
	const prod = carr.find((x) => x.codigo === cod);

	if (prod) {
		carr = carr.filter((x) => x.codigo !== cod);
	}

	return { carr, prod };
};

const limpiarCarr = (carr, arrayPtoStock, arrayStockTot) => {
	for (let i = 0; i < carr.length; i++) {
		const element = carr[i];
		const cod = element.codigo;
		const origen = element.origen;

		const r = modificarCantMultiplesStocks(
			cod,
			origen,
			arrayPtoStock,
			arrayStockTot
		);

		arrayPtoStock = r.filasPtoStock;
		arrayStockTot = r.filasStockTotal;
	}

	carr = [];

	return { carr, arrayPtoStock, arrayStockTot };
};

const modificarCantMultiplesStocks = (
	codigo,
	arrayOrigen,
	ptoStock,
	stockTotal
) => {
	let filasPtoStock = ptoStock;
	let filasStockTotal = stockTotal;

	for (let i = 0; i < arrayOrigen.length; i++) {
		const stockModificado = modCantStock(
			codigo,
			arrayOrigen[i]['ptoStockId'],
			filasPtoStock,
			filasStockTotal,
			arrayOrigen[i]['cantidad']
		);

		filasPtoStock = stockModificado.ptoStock;
		filasStockTotal = stockModificado.stockTotal;
	}

	return { filasPtoStock, filasStockTotal };
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
	let ptoStockMod = arrayPtoStock;
	let stockTotalMod = arrayStockTotal;
	const prod = buscarProdCarr(carr, cod);
	const nuevoOrigen = modCantPtoStockProdCarr_final(prod, ptoStock, cant);
	const total = cantTotalProdCarr(nuevoOrigen);
	let prodMod = modCantTotProdCarr(prod, total);
	prodMod = modOrigenProCarr(prodMod, nuevoOrigen);
	const carrMod = modificarCarrito(carr, prodMod);

	// función que devuelva el delta cantidad
	const cantVar = cantVarPtoStockProdCarr(prod, prodMod, ptoStock);

	// estas funciones me devuelven el stock modificado
	if (ptoStock !== 0) {
		ptoStockMod = modCantPtoStock(cod, ptoStock, arrayPtoStock, cantVar);
		stockTotalMod = modCantStockTotal(cod, arrayStockTotal, cantVar);
	}

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

const modPrecioCarr = (cod, pu, carr) => {
	if (Number.isNaN(parseFloat(pu))) {
		pu = 0;
	}

	const carrMod = carr.map((x) => (x.codigo === cod ? { ...x, pu: pu } : x));
	return carrMod;
};

const calcSubtotCarr = (pu, cant) => {
	const a = pu * cant;
	return a;
};

const calcTotCarr = (arrayProd) => {
	if (arrayProd.length === 0) return 0;
	let arraySubtot = [];
	for (let i = 0; i < arrayProd.length; i++) {
		const element = arrayProd[i];
		const pu = element.pu;
		const cant = element.cantidad;
		const subtot = calcSubtotCarr(pu, cant);
		arraySubtot.push(subtot);
	}
	const tot = sumValores(arraySubtot);
	return tot;
};

const sumValores = (arrayValores) => {
	const r = arrayValores.reduce((acc, el) => acc + el, 0);
	return r;
};

const detMaxVal = (cod, ptoStock, arrayPtoStock, cantInicial) => {
	if (ptoStock === 0) return 99;
	const cant = buscarProdPtoStock(cod, ptoStock, arrayPtoStock).cantidad;
	// la cantidad máxima del input debe tener en cuenta la cant en stock más la cant ya agregada al carrito
	return cant + cantInicial;
};

// funcion que recorra el carritoy saque los productos del stock total y pto stock
const llenarCarr = (carr, arrayPtoStock, arrayStockTotal) => {
	// si la cantidad no está en stock me guardo el codigo y  hago un push a un array.
	// Al final de la funcion elimino todos los productos del carrito con esos codigos y devuelvo los productos eliminados
	let prodsSinStockPtoStock = [];
	let prodsSinStockTotal = [];
	// recorre productos del carrito
	for (let i = 0; i < carr.length; i++) {
		const elementCarr = carr[i];
		const cod = elementCarr.codigo;
		const origen = elementCarr.origen;

		let arrayCants = [];
		// recorre origen del producto
		for (let k = 0; k < origen.length; k++) {
			const elementOrigen = origen[k];
			const ptoStockId = elementOrigen.ptoStockId;
			const cantPtoStock = elementOrigen.cantidad;

			const arrayPtoStockMod = modCantPtoStock(
				cod,
				ptoStockId,
				arrayPtoStock,
				cantPtoStock
			);

			if (arrayPtoStockMod !== 'error') {
				arrayPtoStock = arrayPtoStockMod;
			} else {
				prodsSinStockPtoStock.push(cod);
				// aqui solo debo eliminar el elemento origen del carrito (no el producto)
				origen = quitarPtoStockOrigen(origen, ptoStockId);
				elementCarr = modOrigenProCarr(elementCarr, origen);
			}

			// si ptoStockId es distinto de cero hacer push a arrayCantidades
			if (ptoStockId !== 0) {
				arrayCants.push(cantPtoStock);
			}
		}

		// hacer la suma del array cantidades
		const cantTotal = sumValores(arrayCants); // no debe salir del la cantidad total del producto sino de la suma de las cantidades en origen (sin contar producción)
		const arrayStockTotalMod = modCantStockTotal(
			cod,
			arrayStockTotal,
			cantTotal
		);

		// ahora si cant total debe sumar los productos en producción
		const cantTotTot = cantTotalProdCarr(origen);
		elementCarr = modCantTotProdCarr(elementCarr, cantTotal);
		carr = modificarCarrito(carr, elementCarr);

		if (arrayStockTotalMod !== 'error') {
			arrayStockTotal = arrayStockTotalMod;
		} else {
			carr = quitarProductoCarrito(carr, cod);
			prodsSinStockTotal.push(cod);
		}
	}

	const prodsSinStock = mergeArrays(prodsSinStockPtoStock, prodsSinStockTotal);

	return {
		carr,
		arrayPtoStock,
		arrayStockTotal,
		prodsSinStock,
	};
};

// funcion que haga un merge de dos arrays de codigos y elimine codigos repetidos
const mergeArrays = (prodsSinStockPtoStock, prodsSinStockTotal) => {
	const prodsSinCant = [
		...new Set([...prodsSinStockPtoStock, ...prodsSinStockTotal]),
	];
	return prodsSinCant;
};

const quitarPtoStockOrigen = (origen, ptoStock) => {
	origen = origen.filter((x) => x.ptoStockId !== ptoStock);
	return origen;
};

// funcion que calcule las unidades en produccion de un producto
const cantProdProduccion = () => {};

export {
	agregarCarrito,
	modCantStock,
	quitarProductoCarrito,
	modProdCarr,
	buscarProdPtoStock,
	modPrecioCarr,
	calcSubtotCarr,
	calcTotCarr,
	detMaxVal,
	modificarCantMultiplesStocks,
	limpiarCarr,
	prodCarr,
	llenarCarr,
};
