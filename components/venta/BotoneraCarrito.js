import React from 'react';
import Box from '@material-ui/core/Box';
import BotonDanger from '../BotonDanger';
import BotonAccion from '../BotonAccion';
import BotonNota from '../BotonNota';
import BotonVerMas from '../tablas/componentes/BotonVerMas';
import BotonConfirmar from '../../components/BontonConfirmar';

const BotoneraCarrito = () => {
	return (
		<Box display="flex" bgcolor="background.paper">
			<Box flexGrow={1}>
				<BotonDanger />
			</Box>
			<Box>
				<BotonVerMas />
				<BotonNota />
				<BotonAccion />
				<BotonConfirmar contenido="Confirmar Orden" />
			</Box>
		</Box>
	);
};

export default BotoneraCarrito;
