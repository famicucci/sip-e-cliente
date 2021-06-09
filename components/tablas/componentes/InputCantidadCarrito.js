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

	const onChange = (e) => {
		let a = e.target.value;
		if (Number.isNaN(parseInt(a))) {
			a = 0;
		}
		setValue(e.target.value);
		handleCantidadCarrito(codigoProducto, ptoStock, a);
	};

	return (
		<div>
			<TextField
				className={classes.input}
				type="number"
				value={value}
				onChange={onChange}
				InputProps={{
					inputProps: {
						min: 0,
					},
				}}
			/>
		</div>
	);
};

export default InputCantidadCarrito;
