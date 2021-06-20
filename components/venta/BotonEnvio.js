import React, { useContext } from 'react';
import BotonAccion from '../BotonAccion';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';

const BotonEnvio = () => {
	const { handleOpenEnvio } = useContext(BotoneraCarrContext);

	return (
		<BotonAccion
			onClick={() => {
				handleOpenEnvio();
			}}
		>
			<LocalShippingIcon />
		</BotonAccion>
	);
};

export default BotonEnvio;
