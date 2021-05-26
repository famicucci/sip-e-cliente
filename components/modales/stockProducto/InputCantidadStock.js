import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '13ch',
		},
	},
}));

const InputCantidadStock = ({ cantidad, setCantFila }) => {
	const classes = useStyles();

	const [cantInput, setCantInput] = useState(null);

	useEffect(() => {
		setCantInput(cantidad);
	}, []);

	useEffect(() => {
		setCantFila(cantInput);
	}, [cantInput]);

	const onChange = (e) => {
		setCantInput(e.target.value);
	};

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<TextField
				id="outlined-number"
				label="Cantidad"
				type="number"
				value={cantInput}
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					inputProps: {
						min: 0,
					},
				}}
				variant="outlined"
				onChange={onChange}
			/>
		</form>
	);
};

export default InputCantidadStock;
