import React, { useContext, useEffect } from 'react';
import TablaPrecios from '../components/tablas/TablaPrecios';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';

import IrLogin from '../components/IrLogin';

const Precios = () => {
	const authContext = useContext(AuthContext);
	const { autenticado } = authContext;

	return (
		<>
			{autenticado ? (
				<div>
					<Layout>
						<TablaPrecios />
					</Layout>
				</div>
			) : (
				<IrLogin />
			)}
		</>
	);
};

export default Precios;
