import React, { useContext } from 'react';
import BotonSuccess from '../generales/botones/BotonSuccess';
import BotonDanger from '../generales/BotonDanger';
import { Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import { useRouter } from 'next/router';

const BotoneraModificarOrden = () => {
	const router = useRouter();

	const { cancelOrderToModify, editProductsOrder } = useContext(VentasContext);

	const onClickCancel = () => {
		cancelOrderToModify();
		router.push('/ventas/consultar');
	};

	const onClickConfirmChanges = async () => {
		await editProductsOrder();

		router.push({
			pathname: '/ventas/consultar',
			query: { 'edited-order': router.query.id },
		});
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
