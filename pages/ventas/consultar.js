import React, { useContext } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/IrLogin';

const ConsultarVenta = () => {
	const { autenticado } = useContext(AuthContext);

	return (
		<>
			{autenticado ? (
				<div>
					<Layout>
						<h1>Desde Consultar Ventas</h1>
					</Layout>
				</div>
			) : (
				<IrLogin />
			)}
		</>
	);
};

export default ConsultarVenta;
