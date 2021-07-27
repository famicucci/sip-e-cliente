import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: (props) => theme.spacing(props.marginTop),
		width: '100%',
	},
}));

const InputNumberBordeInferior = (props) => {
	const classes = useStyles(props);

	const {
		label,
		name,
		placeholder,
		ancho,
		required,
		valInit,
		funcModState,
		disabled,
		InputProps,
	} = props;

	const [valor, setValor] = useState(valInit);

	const onChange = (e) => {
		setValor(e.target.value);
		funcModState(e.target.name, e.target.value);
	};

	// if (required) {
	// 	required = { required: 'true' };
	// }

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
				{...InputProps}
				{...props}
				fullWidth
			/>
		</Grid>
	);
};

export default InputNumberBordeInferior;
