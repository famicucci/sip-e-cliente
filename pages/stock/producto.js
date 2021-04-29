import React from 'react';
import Layout from '../../components/layouts/Layout';
import TablaStockProducto from '../../components/tablas/TablaStockProducto';

const ConsultarStock = () => {
	return (
		<div>
			<Layout>
				<TablaStockProducto />
			</Layout>
		</div>
	);
};

export default ConsultarStock;
