import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/IrLogin';
import SpinnerPantalla from '../../components/SpinnerPantalla';
import CreateOrEditOrder from '../../components/venta/CreateOrEditOrder';
import { useRouter } from 'next/router';
import VentasContext from '../../context/ventas/ventasContext';

const Nuevo = () => {
	const router = useRouter();

	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;
	const { cancelOrderToModify } = useContext(VentasContext);

	useEffect(() => {
		usuarioAutenticado();
	}, []);

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			cancelOrderToModify();
		};

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	if (!autenticado && cargando) {
		return <SpinnerPantalla />;
	}

	if (!autenticado && !cargando) {
		return <IrLogin />;
	}

	return (
		<Layout>
			<CreateOrEditOrder />
		</Layout>
	);
};

export default Nuevo;
