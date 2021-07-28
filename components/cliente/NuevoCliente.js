import React, { useContext } from 'react';
import FormNuevoCliente from '../cliente/FormNuevoCliente';
import VentasContext from '../../context/ventas/ventasContext';
import ModalScroll2 from '../generales/ModalScroll2';
import ClientesContext from '../../context/clientes/clientesContext';

const NuevoCliente = () => {
	const { openModalNuevoCliente, handleOpenModalNuevoCliente } =
		useContext(ClientesContext);

	return (
		<ModalScroll2
			openModal={openModalNuevoCliente}
			handleClose={handleOpenModalNuevoCliente}
			titulo="Nuevo Cliente"
			padding={16}
		>
			<FormNuevoCliente handleClose={handleOpenModalNuevoCliente} />
		</ModalScroll2>
	);
};

export default NuevoCliente;
