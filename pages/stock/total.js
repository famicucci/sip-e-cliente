import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import TablaStockTotal from '../../components/stock/TablaStockTotal';
import IrLogin from '../../components/generales/IrLogin';
import SpinnerPantalla from '../../components/generales/SpinnerPantalla';
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
