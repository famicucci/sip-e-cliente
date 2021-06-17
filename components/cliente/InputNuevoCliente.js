import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ClientesContext from '../../context/clientes/clientesContext';

const InputNuevoCliente = ({ label, name, placeholder, ancho, required }) => {
	const [valor, setValor] = useState('');

	const { handleClienteActivo } = useContext(ClientesContext);

	const onChange = (e) => {
		setValor(e.target.value);
		handleClienteActivo(e.target.name, e.target.value);
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
				id="standard-secondary"
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
