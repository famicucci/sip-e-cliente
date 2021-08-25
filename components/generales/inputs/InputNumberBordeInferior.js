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
	const classes = useStyles(props.styles);

	const {
		label,
		name,
		placeholder,
		ancho,
		initialvalue,
		tochangestate,
		disabled,
		InputProps,
	} = props;

	const [valor, setValor] = useState(initialvalue);

	const onChange = (e) => {
		setValor(e.target.value);
		tochangestate(e.target.name, e.target.value);
	};

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
				fullWidth
			/>
		</Grid>
	);
};

export default InputNumberBordeInferior;
