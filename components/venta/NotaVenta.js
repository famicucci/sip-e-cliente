import React from 'react';
import TextField from '@material-ui/core/TextField';

const NotaVenta = () => {
	return (
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
	);
};

export default NotaVenta;
