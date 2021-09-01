import React, { useContext, useEffect } from 'react';
import BotonSuccess from '../generales/botones/BotonSuccess';
import BotonDanger from '../generales/BotonDanger';
import { Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import { useRouter } from 'next/router';

const BotoneraModificarOrden = () => {
	const router = useRouter();

	const { orderToModify, cancelOrderToModify, editProductsOrder } =
		useContext(VentasContext);

	useEffect(() => {
		console.log(orderToModify);
		if (orderToModify === null) router.push('/ventas/consultar');
	}, [orderToModify]);

	const onClickCancel = () => {
		cancelOrderToModify();
		router.push('/ventas/consultar');
	};

	const onClickConfirmChanges = () => {
		editProductsOrder();
	};

	return (
		<Box display="flex" justifyContent="flex-end">
			<BotonDanger contenido="cancelar" onClick={onClickCancel} />
			<BotonSuccess
				type="button"
				contenido="Confirmar Cambios"
				onClick={onClickConfirmChanges}
			/>
		</Box>
	);
};

export default BotoneraModificarOrden;
