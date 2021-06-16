import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';

const NotaVenta = () => {
	const { openNota } = useContext(BotoneraCarrContext);

	return (
		<Collapse in={openNota} timeout="auto" unmountOnExit>
			<TextField
				label="Nota"
				placeholder="Nota..."
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

export default NotaVenta;
