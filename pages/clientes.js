import React, { useContext } from 'react';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/IrLogin';

const Clientes = () => {
	const authContext = useContext(AuthContext);
	const { autenticado } = authContext;

	return (
		<>
			{autenticado ? (
				<div>
					<Layout>
						<h1>Desde Clientes</h1>
					</Layout>
				</div>
			) : (
				<IrLogin />
			)}
		</>
	);
};

export default Clientes;
