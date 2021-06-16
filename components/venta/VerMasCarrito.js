import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';

const VerMasCarrito = () => {
	const { openVerMas } = useContext(BotoneraCarrContext);

	return (
		<Collapse in={openVerMas} timeout="auto" unmountOnExit>
			<TextField
				label="Nº Ecommerce"
				placeholder="Escribe el identificador aquí.."
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				color="secondary"
				autoFocus
			/>
		</Collapse>
	);
};

export default VerMasCarrito;
