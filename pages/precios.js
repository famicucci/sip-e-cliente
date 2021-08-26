import React, { useContext, useEffect } from 'react';
import TablaPrecios from '../components/precio/TablaPrecios';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/generales/IrLogin';
import SpinnerPantalla from '../components/generales/SpinnerPantalla';

const Precios = () => {
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
			<TablaPrecios />
		</Layout>
	);
};

export default Precios;
