import React, { useContext } from 'react';
import FormNuevoCliente from '../cliente/FormNuevoCliente';
import ModalScroll2 from '../generales/ModalScroll2';
import ClientesContext from '../../context/clientes/clientesContext';

const EditarCliente = () => {
	const { filaActiva, openEditClient, handleOpenEditClient, editClient } =
		useContext(ClientesContext);

	const initialStateCliente = {
		clientId: null,
		nombre: filaActiva.nombre,
		apellido: filaActiva.apellido,
		instagram: filaActiva.instagram,
		facebook: filaActiva.facebook,
		celular: filaActiva.celular,
		email: filaActiva.email,
		mascota: filaActiva.mascota,
		tipo: filaActiva.tipo,
		dni: filaActiva.dni,
		razonSocial: filaActiva.razonSocial,
		codPostal: '',
		refDireccion: '',
		calle: '',
		numeroCalle: '',
		piso: '',
		depto: '',
		barrio: '',
		ciudad: '',
		provincia: '',
		observaciones: filaActiva.observaciones,
		mascota: filaActiva.mascota,
		tipo: filaActiva.tipo,
		condIva: filaActiva.condIva,
	};

	return (
		<ModalScroll2
			openModal={openEditClient}
			handleClose={handleOpenEditClient}
			titulo="Nuevo Cliente"
			padding={16}
		>
			<FormNuevoCliente
				handleClose={handleOpenEditClient}
				crearCliente={editClient}
				initialStateCliente={initialStateCliente}
			/>
		</ModalScroll2>
	);
};

export default EditarCliente;
