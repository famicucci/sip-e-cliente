import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		// marginTop: theme.spacing(3),
	},
}));

const InputBordeInferior = ({
	label,
	name,
	placeholder,
	ancho,
	required,
	initialvalue,
	funcModState,
}) => {
	const classes = useStyles();

	const [valor, setValor] = useState(initialvalue);

	useEffect(() => {
		setValor(initialvalue);
	}, [initialvalue]);

	const onChange = (e) => {
		setValor(e.target.value);
		funcModState(e.target.name, e.target.value);
	};

	if (required) {
		required = { required: 'true' };
	}

	return (
		<Grid item xs={ancho}>
			<TextField
				className={classes.root}
				name={name}
				value={valor}
				onChange={onChange}
				label={label}
				placeholder={placeholder}
				fullWidth
				// margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				{...required}
			/>
		</Grid>
	);
};

export default InputBordeInferior;
