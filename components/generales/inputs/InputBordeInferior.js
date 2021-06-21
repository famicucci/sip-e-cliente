import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const InputNuevoCliente = ({ label, name, placeholder, ancho, required }) => {
	const [valor, setValor] = useState('');

	const onChange = (e) => {
		setValor(e.target.value);
		// handleClienteActivo(e.target.name, e.target.value);
	};

	if (required) {
		required = { required: 'true' };
	}

	return (
		<Grid item xs={ancho}>
			<TextField
				name={name}
				value={valor}
				onChange={onChange}
				label={label}
				placeholder={placeholder}
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				{...required}
			/>
		</Grid>
	);
};

export default InputNuevoCliente;
