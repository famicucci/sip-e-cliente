import React, { useContext } from 'react';
import Layout from '../../components/layouts/Layout';
import TablaMovimientos from '../../components/tablas/TablaMovimientos';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/IrLogin';

const ConsultarVenta = () => {
	const { autenticado } = useContext(AuthContext);

	return (
		<>
			{autenticado ? (
				<div>
					<Layout>
						<TablaMovimientos />
					</Layout>
				</div>
			) : (
				<IrLogin />
			)}
		</>
	);
};

export default ConsultarVenta;
