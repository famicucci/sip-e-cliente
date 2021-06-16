import React from 'react';
import Box from '@material-ui/core/Box';
import BotonLimpiarCarrito from '../BotonLimpiarCarrito';
import BotonEnvio from './BotonEnvio';
import BotonNota from '../BotonNota';
import BotonVerMas from '../tablas/componentes/BotonVerMas';
import BotonConfirmar from '../../components/BontonConfirmar';
import BotonCliente from './BotonCliente';

const BotoneraCarrito = () => {
	return (
		<Box display="flex" bgcolor="background.paper">
			<Box flexGrow={1}>
				<BotonLimpiarCarrito />
			</Box>
			<Box>
				<BotonVerMas />
				<BotonNota />
				<BotonCliente />
				<BotonEnvio />
				<BotonConfirmar contenido="Confirmar Orden" />
			</Box>
		</Box>
	);
};

export default BotoneraCarrito;
