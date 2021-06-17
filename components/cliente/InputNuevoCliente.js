import React, { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ClientesContext from '../../context/clientes/clientesContext';

const InputNuevoCliente = ({ label, name, placeholder, ancho, required }) => {
	const [valor, setValor] = useState('');

	const { clienteActivo, handleClienteActivo } = useContext(ClientesContext);

	useEffect(() => {
		// si cambia cliente activo tengo que extraer el valor del cliente activo y hacer setValor
		let nuevoValor;
		if (clienteActivo.hasOwnProperty(name)) {
			nuevoValor = clienteActivo[name];
			setValor(nuevoValor);
		} else {
			nuevoValor = '';
			setValor(nuevoValor);
		}
	}, [clienteActivo]);

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
