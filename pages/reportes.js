import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/layouts/Layout';
import AuthContext from '../context/autenticacion/authContext';
import IrLogin from '../components/generales/IrLogin';
import SpinnerPantalla from '../components/generales/SpinnerPantalla';
import DisplayCharts from '../components/reporte/DisplayCharts';

const Reportes = () => {
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
			<DisplayCharts />
		</Layout>
	);
};

export default Reportes;
