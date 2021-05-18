import React, { useContext } from 'react';
import Layout from '../../components/layouts/Layout';
import TablaStockProducto from '../../components/tablas/TablaStockProducto';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/IrLogin';

const ConsultarStock = () => {
	const { autenticado } = useContext(AuthContext);

	return (
		<>
			{autenticado ? (
				<div>
					<Layout>
						<TablaStockProducto />
					</Layout>
				</div>
			) : (
				<IrLogin />
			)}
		</>
	);
};

export default ConsultarStock;
