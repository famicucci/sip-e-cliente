import React from 'react';
import DatosCliente from './DatosCliente';
import ContactoCliente from './ContactoCliente';
import MasDatosCliente from './MasDatosCliente';
import DomicilioCliente from './DomicilioCliente';
import ModalScroll2 from '../generales/ModalScroll2';

const InformacionCliente = (props) => {
	if (!props.openModalInformacionCliente) return null;

	return (
		<ModalScroll2
			openModal={props.openModalInformacionCliente}
			handleClose={() => {
				props.handleCloseModal();
				props.handleFilaActiva(null);
			}}
			titulo="Cliente"
			anexoTitulo={`${props.cliente.nombre} ${props.cliente.apellido}`}
			padding={16}
		>
			<DatosCliente cliente={props.cliente} />
			<ContactoCliente cliente={props.cliente} />
			<DomicilioCliente cliente={props.cliente} />
			<MasDatosCliente cliente={props.cliente} />
		</ModalScroll2>
	);
};

export default InformacionCliente;
