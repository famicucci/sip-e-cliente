import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import StockContext from '../../../context/stock/stockContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '13ch',
		},
	},
}));

const InputCantidadStock = ({ cantidad }) => {
	const classes = useStyles();

	const { handleNuevaCantidad } = useContext(StockContext);

	const [cantInput, setCantInput] = useState('');

	useEffect(() => {
		setCantInput(cantidad);
	}, []);

	useEffect(() => {
		handleNuevaCantidad(cantInput);
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
