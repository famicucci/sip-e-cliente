import React, { useContext } from 'react';
import Layout from '../../components/layouts/Layout';
import TablaPuntoStock from '../../components/tablas/TablaPuntoStock';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/IrLogin';

const ConsultarStock = () => {
	const { autenticado } = useContext(AuthContext);

	return (
		<>
			{autenticado ? (
				<div>
					<Layout>
						<TablaPuntoStock />
					</Layout>
				</div>
			) : (
				<IrLogin />
			)}
		</>
	);
};

export default ConsultarStock;
