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
	const {
		handleEnvio,
		handleCliente,
		handleNota,
		handleInputOrdenEcommerce,
		handlePtoVenta,
	} = useContext(VentasContext);

	useEffect(() => {
		usuarioAutenticado();

		const getInitialValueOfSale = (key, callback) => {
			if (localStorage.getItem(key)) {
				const initialValue = JSON.parse(localStorage.getItem(key));
				callback(initialValue);
			}
		};

		getInitialValueOfSale('envio', handleEnvio);
		getInitialValueOfSale('cliente', handleCliente);
		getInitialValueOfSale('nota', handleNota);
		getInitialValueOfSale('ordenEcommerce', handleInputOrdenEcommerce);
		getInitialValueOfSale('ptoVenta', handlePtoVenta);
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
