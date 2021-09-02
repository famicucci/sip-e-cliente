import React, { useContext } from 'react';
import DatosCliente from './DatosCliente';
import ContactoCliente from './ContactoCliente';
import MasDatosCliente from './MasDatosCliente';
import DomicilioCliente from './DomicilioCliente';
import ModalScroll2 from '../generales/ModalScroll2';
import ClienteContext from '../../context/clientes/ClienteContext';

const InformacionCliente = () => {
	const {
		filaActiva,
		openModalInformacionCliente,
		handleOpenEditClient,
		handleOpenModalInformacionCliente,
		handleFilaActiva,
	} = useContext(ClienteContext);

	const editClient = () => {
		handleOpenEditClient(true);
		handleOpenModalInformacionCliente(false);
	};

	return (
		<ModalScroll2
			openModal={openModalInformacionCliente}
			handleClose={() => {
				handleOpenModalInformacionCliente(false);
				handleFilaActiva(null);
			}}
			titulo="Cliente"
			anexoTitulo={`${filaActiva.nombre} ${filaActiva.apellido}`}
			morevertactions={[
				{
					content: 'Editar',
					function: editClient,
				},
				{
					content: 'Imprimir',
					function: () => {
						console.log('imprimiendooo');
					},
				},
			]}
			padding={2}
		>
			<DatosCliente cliente={filaActiva} />
			<ContactoCliente cliente={filaActiva} />
			<DomicilioCliente cliente={filaActiva} />
			<MasDatosCliente cliente={filaActiva} />
		</ModalScroll2>
	);
};

export default InformacionCliente;
