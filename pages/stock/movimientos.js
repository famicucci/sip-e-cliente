import React, { useContext, useEffect } from 'react';
import TablaMovimientos from '../../components/stock/TablaMovimientos';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/generales/IrLogin';
import Layout from '../../components/layouts/Layout';
import SpinnerPantalla from '../../components/SpinnerPantalla';

const MovimientoStock = () => {
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
			<TablaMovimientos />
		</Layout>
	);
};

export default MovimientoStock;
