import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		width: '100%',
	},
}));

const InputNuevoCliente = ({
	label,
	name,
	placeholder,
	ancho,
	required,
	valInit,
	funcModState,
	disabled,
}) => {
	const classes = useStyles();

	const [valor, setValor] = useState(valInit);

	const onChange = (e) => {
		setValor(e.target.value);
		funcModState(e.target.name, e.target.value);
	};

	if (required) {
		required = { required: 'true' };
	}

	if (disabled) {
		disabled = { disabled: true };
	}

	return (
		<Grid item xs={ancho} className={classes.root}>
			<TextField
				type="number"
				value={valor}
				label={label}
				name={name}
				placeholder={placeholder}
				InputLabelProps={{
					shrink: true,
				}}
				onChange={onChange}
				{...disabled}
			/>
		</Grid>
	);
};

export default InputNuevoCliente;
