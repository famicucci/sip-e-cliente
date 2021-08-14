import React from 'react';
import BotonSuccess from '../generales/botones/BotonSuccess';
import BotonDanger from '../BotonDanger';
import { Box } from '@material-ui/core';

const BotoneraModificarOrden = () => {
	return (
		<Box display="flex" justifyContent="flex-end">
			<BotonDanger
				contenido="cancelar"
				onClick={() => {
					console.log('cancelar cambios');
				}}
			/>
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
