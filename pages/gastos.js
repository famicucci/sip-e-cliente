import React, { useContext } from 'react';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/IrLogin';

const Gastos = () => {
	const authContext = useContext(AuthContext);
	const { autenticado } = authContext;

	return (
		<>
			{autenticado ? (
				<div>
					<Layout>
						<h1>Desde Gastos</h1>
					</Layout>
				</div>
			) : (
				<IrLogin />
			)}
		</>
	);
};

export default Gastos;
