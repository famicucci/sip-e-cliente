import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/generales/IrLogin';
import SpinnerPantalla from '../../components/generales/SpinnerPantalla';
import TablaProductosAMover from '../../components/venta/TablaProductosAMover';

const ConsultarVenta = () => {
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
			<TablaProductosAMover />
		</Layout>
	);
};

export default ConsultarVenta;
