import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import VentasContext from '../../../context/ventas/ventasContext';

const useStyles = makeStyles({
	input: {
		width: '40px',
	},
});

const InputCantidadCarrito = ({ codigoProducto, ptoStock, cantidad }) => {
	const classes = useStyles();

	const { handleCantidadCarrito } = useContext(VentasContext);

	const [value, setValue] = useState(cantidad);

	useEffect(() => {
		setValue(cantidad);
	}, [cantidad]);

	useEffect(() => {
		handleCantidadCarrito(codigoProducto, ptoStock, value);
	}, [value]);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div>
			<TextField
				className={classes.input}
				type="number"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default InputCantidadCarrito;
