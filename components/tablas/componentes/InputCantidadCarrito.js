import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import VentasContext from '../../../context/ventas/ventasContext';
import { buscarProdPtoStock } from '../../../functions/ventas';

const useStyles = makeStyles({
	input: {
		width: '40px',
	},
});

const InputCantidadCarrito = ({ codigoProducto, ptoStock, cantidad }) => {
	const classes = useStyles();

	const { handleCantidadCarrito, preciosPtoStock } = useContext(VentasContext);

	const [value, setValue] = useState(cantidad);
	const [maxVal, setMaxVal] = useState(null);

	useEffect(() => {
		const detMaxVal = (cod, ptoStock, arrayPtoStock) => {
			const cant = buscarProdPtoStock(cod, ptoStock, arrayPtoStock).cantidad;
			// el input siempre comienza en 1 por lo tanto la cant. máxima es la cantidad en stock + 1
			return cant + 1;
		};

		const maxVal = detMaxVal(codigoProducto, ptoStock, preciosPtoStock);
		setMaxVal(maxVal);
	}, []);

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
						max: maxVal,
					},
				}}
			/>
		</div>
	);
};

export default InputCantidadCarrito;
