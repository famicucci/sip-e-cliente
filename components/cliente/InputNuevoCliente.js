import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'block',
	},
}));

const InputNuevoCliente = ({ label, name, placeholder, ancho, required }) => {
	const classes = useStyles();

	const [valor, setValor] = useState('');

	const onChange = (e) => {
		console.log(e.target.name);
		console.log(e.target.value);
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
