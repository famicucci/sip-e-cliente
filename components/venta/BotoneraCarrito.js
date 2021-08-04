import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import BotonEnvio from './BotonEnvio';
import BotonNota from '../BotonNota';
import BotonVerMas from '../tablas/componentes/BotonVerMas';
import BotonCliente from './BotonCliente';
import VentasContext from '../../context/ventas/ventasContext';
import BotonLimpiar from '../BotonLimpiar';
import BotonSuccess from '../generales/botones/BotonSuccess';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../Alerta';
import { useRouter } from 'next/router';
import { Direccion } from '../../functions/envio';

const BotoneraCarrito = () => {
	const router = useRouter();

	const {
		carrito,
		cliente,
		limpiarCarrito,
		limpiarCliente,
		crearOrden,
		envio,
	} = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	const onClickConfirmarOrden = () => {
		if (!cliente) {
			mostrarAlerta('Debes cargar un cliente!', 'error');
			return;
		}

		if (carrito.length === 0) {
			mostrarAlerta('La orden no tiene productos cargados', 'error');
			return;
		}

		crearOrden();
		router.push('/ventas/consultar');
	};

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
					onClick={onClickConfirmarOrden}
				/>
			</Box>
			{alerta !== null ? <Alerta /> : null}
		</Box>
	);
};

export default BotoneraCarrito;
