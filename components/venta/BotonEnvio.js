import React, { useContext } from 'react';
import BotonAccion from '../BotonAccion';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../Alerta';

const BotonEnvio = () => {
	const { handleOpenEnvio } = useContext(BotoneraCarrContext);
	const { cliente } = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	const onClick = (e) => {
		if (cliente) {
			handleOpenEnvio();
		} else {
			// alerta
			mostrarAlerta('Por favor, elegir primero un cliente', 'warning');
		}
	};

	return (
		<>
			<BotonAccion onClick={onClick}>
				<LocalShippingIcon />
			</BotonAccion>
			{alerta ? <Alerta /> : null}
		</>
	);
};

export default BotonEnvio;
