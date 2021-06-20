import React, { useContext } from 'react';
import BotonAccion from '../BotonAccion';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';

const BotonCliente = () => {
	const { handleOpenCliente } = useContext(BotoneraCarrContext);

	return (
		<BotonAccion
			onClick={() => {
				handleOpenCliente();
			}}
		>
			<PersonAddIcon />
		</BotonAccion>
	);
};

export default BotonCliente;
