import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/generales/IrLogin';
import SpinnerPantalla from '../../components/SpinnerPantalla';
import CreateOrEditOrder from '../../components/venta/CreateOrEditOrder';

const Nuevo = () => {
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
			<CreateOrEditOrder />
		</Layout>
	);
};

export default Nuevo;
