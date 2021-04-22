import React from 'react';
import { List, Divider } from '@material-ui/core';

import Precios from './Precios';
import Ventas from './Ventas';
import Stock from './Stock';
import Clientes from './Clientes';
import Gastos from './Gastos';
import Reportes from './Reportes';

const Lista = () => {
	return (
		<List component="nav">
			<Precios />

			<Ventas />

			<Stock />

			<Clientes />

			<Gastos />

			<Reportes />

			<Divider />
		</List>
	);
};

export default Lista;
