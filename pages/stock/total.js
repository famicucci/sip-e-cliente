import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import TablaStockTotal from '../../components/tablas/TablaStockTotal';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/IrLogin';
import SpinnerPantalla from '../../components/SpinnerPantalla';
import Alerta from '../../components/Alerta';

const ConsultarStockTotal = () => {
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
			<TablaStockTotal />
			<Alerta mensaje="La cantidad no puede ser negativa" severidad="error" />
		</Layout>
	);
};

export default ConsultarStockTotal;
