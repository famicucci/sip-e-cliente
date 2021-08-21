import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import { IconButton, Box } from '@material-ui/core';
import BotonSuccess from '../generales/botones/BotonSuccess';
import BotonAccion from '../BotonAccion';
import Alerta from '../Alerta';
import {
	LocalShipping,
	PersonAdd,
	Note,
	NoteOutlined,
	ArrowDropUp,
	ArrowDropDown,
	Brush,
} from '@material-ui/icons';

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
	const {
		openVerMas,
		openNota,
		handleVerMas,
		handleOpenNota,
		handleOpenCliente,
		handleOpenEnvio,
	} = useContext(BotoneraCarrContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	useEffect(() => {
		if (ordenCreada) {
			router.push({
				pathname: '/ventas/consultar',
			});
		}
	}, [ordenCreada]);

	const onClickClean = () => {
		handleEnvio({});
		handleCliente(null);
		carrito.forEach((x) => {
			handleRemoveProductCart(x.ProductoCodigo);
		});
	};

	const onClickSeeMore = () => {
		handleVerMas();
	};

	const onClickSetNote = () => {
		handleOpenNota();
	};

	const onClickSetClient = () => {
		handleOpenCliente();
	};

	const onClickSetShipping = () => {
		if (cliente) {
			handleOpenEnvio();
		} else {
			// alerta
			mostrarAlerta('Por favor, elegir primero un cliente', 'warning');
		}
	};

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

	return (
		<Box display="flex" bgcolor="background.paper">
			<Box flexGrow={1}>
				<IconButton onClick={onClickClean}>
					<Brush color="error" />
				</IconButton>
			</Box>
			<Box>
				<IconButton size="medium" onClick={onClickSeeMore}>
					{!openVerMas ? <ArrowDropDown /> : <ArrowDropUp />}
				</IconButton>
				<IconButton onClick={onClickSetNote}>
					{!openNota ? <NoteOutlined /> : <Note />}
				</IconButton>
				<BotonAccion onClick={onClickSetClient}>
					<PersonAdd />
				</BotonAccion>
				<BotonAccion onClick={onClickSetShipping}>
					<LocalShipping />
				</BotonAccion>
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
