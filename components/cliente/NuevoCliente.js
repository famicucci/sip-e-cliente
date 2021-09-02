import React, { useContext } from 'react';
import FormNuevoCliente from '../cliente/FormNuevoCliente';
import ModalScroll2 from '../generales/ModalScroll2';
import ClientesContext from '../../context/clientes/clientesContext';

const NuevoCliente = () => {
	const { openModalNuevoCliente, handleOpenModalNuevoCliente, crearCliente } =
		useContext(ClientesContext);

	const initialStateCliente = {
		nombre: '',
		apellido: '',
		instagram: '',
		facebook: '',
		celular: '',
		email: '',
		mascota: '',
		tipo: '',
		dni: '',
		razonSocial: '',
		codPostal: '',
		refDireccion: '',
		calle: '',
		numeroCalle: '',
		piso: '',
		depto: '',
		barrio: '',
		ciudad: '',
		provincia: '',
		observaciones: '',
		mascota: '',
		tipo: 'Minorista',
		condIva: 'Consumidor Final',
	};

	return (
		<ModalScroll2
			openModal={openModalNuevoCliente}
			handleClose={handleOpenModalNuevoCliente}
			titulo="Nuevo Cliente"
			padding={16}
		>
			<FormNuevoCliente
				handleClose={handleOpenModalNuevoCliente}
				crearCliente={crearCliente}
				initialStateCliente={initialStateCliente}
			/>
		</ModalScroll2>
	);
};

export default NuevoCliente;
