import React, { useContext } from 'react';
import ModalScroll from '../generales/ModalScroll';
import VentasContext from '../../context/ventas/ventasContext';

const DetalleOrden = () => {
	const { openModalDetalleOrden, handleCloseModal } = useContext(VentasContext);
	// recibe la fila activa y filtra el detalle de la orden
	return (
		<ModalScroll
			openModal={openModalDetalleOrden}
			handleClose={handleCloseModal}
		>
			<p>Detalle Orden</p>
		</ModalScroll>
	);
};

export default DetalleOrden;
