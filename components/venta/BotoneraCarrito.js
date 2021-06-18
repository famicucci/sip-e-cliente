import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import BotonEnvio from './BotonEnvio';
import BotonNota from '../BotonNota';
import BotonVerMas from '../tablas/componentes/BotonVerMas';
import BotonCliente from './BotonCliente';
import BotonConfirmarAccion from '../BotonConfirmarAccion';
import VentasContext from '../../context/ventas/ventasContext';
import BotonLimpiar from '../BotonLimpiar';

const BotoneraCarrito = () => {
	const { limpiarCarrito, limpiarCliente } = useContext(VentasContext);

	return (
		<Box display="flex" bgcolor="background.paper">
			<Box flexGrow={1}>
				<BotonLimpiar
					onClick={() => {
						limpiarCarrito();
						limpiarCliente();
					}}
				/>
			</Box>
			<Box>
				<BotonVerMas />
				<BotonNota />
				<BotonCliente />
				<BotonEnvio />
				<BotonConfirmarAccion contenido="Confirmar Orden" />
			</Box>
		</Box>
	);
};

export default BotoneraCarrito;
