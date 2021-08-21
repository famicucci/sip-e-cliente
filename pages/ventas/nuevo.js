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

		const getInitialValueOfSale = (key, initialValue, callback) => {
			if (localStorage.getItem(key)) {
				initialValue = JSON.parse(localStorage.getItem(key));
			}
			callback(initialValue);
		};

		getInitialValueOfSale(
			'envio',
			{
				modoDirecc: 'input',
				input: '',
				select: null,
				tipo: 1,
				costo: 0,
			},
			handleEnvio
		);
		getInitialValueOfSale('cliente', null, handleCliente);
		getInitialValueOfSale('nota', '', handleNota);
		getInitialValueOfSale('ordenEcommerce', '', handleInputOrdenEcommerce);
		getInitialValueOfSale('ptoVenta', 1, handlePtoVenta);
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
