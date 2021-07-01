import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import BotonEnvio from './BotonEnvio';
import BotonNota from '../BotonNota';
import BotonVerMas from '../tablas/componentes/BotonVerMas';
import BotonCliente from './BotonCliente';
import VentasContext from '../../context/ventas/ventasContext';
import BotonLimpiar from '../BotonLimpiar';
import BotonSuccess from '../generales/botones/BontonSuccess';

const BotoneraCarrito = () => {
	const { limpiarCarrito, limpiarCliente, crearOrden } =
		useContext(VentasContext);

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
				<BotonSuccess
					type="button"
					contenido="Confirmar Orden"
					onClick={() => {
						crearOrden();
					}}
				/>
			</Box>
		</Box>
	);
};

export default BotoneraCarrito;
