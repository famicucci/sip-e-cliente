import React, { useContext, useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/IrLogin';
import SpinnerPantalla from '../components/SpinnerPantalla';

const Clientes = () => {
	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	if (!autenticado && cargando) {
		return <SpinnerPantalla />;
	}

	if (!autenticado && !cargando) {
		return <IrLogin />;
	}

	return (
		<Layout>
			<h1>Desde Clientes</h1>
		</Layout>
	);
};

export default Clientes;
