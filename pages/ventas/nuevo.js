import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import AuthContext from '../../context/autenticacion/authContext';
import IrLogin from '../../components/IrLogin';
import SpinnerPantalla from '../../components/SpinnerPantalla';
import NuevaVenta from '../../components/venta/NuevaVenta';
import VentasContext from '../../context/ventas/ventasContext';

const Nuevo = () => {
	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;
	const { handleEnvio, handleCliente } = useContext(VentasContext);

	useEffect(() => {
		usuarioAutenticado();

		let shippingInit = {};
		if (localStorage.getItem('envio')) {
			shippingInit = JSON.parse(localStorage.getItem('envio'));
		} else {
			shippingInit = {
				modoDirecc: 'input',
				input: '',
				select: null,
				tipo: 1,
				costo: 0,
			};
		}

		let clientInit = {};
		if (localStorage.getItem('cliente')) {
			clientInit = JSON.parse(localStorage.getItem('cliente'));
			handleCliente(clientInit);
		}

		handleEnvio(shippingInit);
	}, []);

	if (!autenticado && cargando) {
		return <SpinnerPantalla />;
	}

	if (!autenticado && !cargando) {
		return <IrLogin />;
	}

	return (
		<Layout>
			<NuevaVenta />
		</Layout>
	);
};

export default Nuevo;
