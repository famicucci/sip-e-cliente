import React, { useContext, useEffect } from 'react';
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
import BrushIcon from '@material-ui/icons/Brush';
import IconButton from '@material-ui/core/IconButton';
import { useRouter } from 'next/router';

const BotoneraCarrito = () => {
	const router = useRouter();

	const {
		carrito,
		cliente,
		crearOrden,
		ordenCreada,
		handleEnvio,
		handleCliente,
		handleRemoveProductCart,
	} = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	useEffect(() => {
		if (ordenCreada) {
			router.push({
				pathname: '/ventas/consultar',
			});
		}
	}, [ordenCreada]);

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
	};

	const onClickClean = () => {
		handleEnvio({});
		handleCliente(null);
		carrito.forEach((x) => {
			handleRemoveProductCart(x.ProductoCodigo);
		});
	};

	return (
		<Box display="flex" bgcolor="background.paper">
			<Box flexGrow={1}>
				<IconButton aria-label="Agregar Nota" onClick={onClickClean}>
					<BrushIcon color="error" />
				</IconButton>
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
