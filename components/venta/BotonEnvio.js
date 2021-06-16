import React from 'react';
import BotonAccion from '../BotonAccion';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const BotonEnvio = () => {
	return (
		<BotonAccion>
			<LocalShippingIcon />
		</BotonAccion>
	);
};

export default BotonEnvio;
