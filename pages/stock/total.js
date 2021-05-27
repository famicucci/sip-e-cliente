import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import TablaStockTotal from '../../components/tablas/TablaStockTotal';
import IrLogin from '../../components/IrLogin';
import SpinnerPantalla from '../../components/SpinnerPantalla';
import Alerta from '../../components/Alerta';
import AuthContext from '../../context/autenticacion/authContext';

const ConsultarStockTotal = () => {
	const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext);

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
		</Layout>
	);
};

export default ConsultarStockTotal;
