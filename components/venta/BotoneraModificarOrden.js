import React, { useContext } from 'react';
import BotonSuccess from '../generales/botones/BotonSuccess';
import BotonDanger from '../BotonDanger';
import { Box } from '@material-ui/core';
import VentasContext from '../../context/ventas/ventasContext';
import { useRouter } from 'next/router';

const BotoneraModificarOrden = () => {
	const router = useRouter();

	const { cancelOrderToModify } = useContext(VentasContext);

	const onClickCancel = () => {
		cancelOrderToModify();
		router.push('/ventas/consultar');
	};

	return (
		<Box display="flex" justifyContent="flex-end">
			<BotonDanger contenido="cancelar" onClick={onClickCancel} />
			<BotonSuccess
				type="button"
				contenido="Confirmar Cambios"
				onClick={() => {
					console.log('modificar orden');
				}}
			/>
		</Box>
	);
};

export default BotoneraModificarOrden;
