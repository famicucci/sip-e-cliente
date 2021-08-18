import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import VentasContext from '../../../context/ventas/ventasContext';

const useStyles = makeStyles({
	input: {
		width: '40px',
	},
});

const InputCantidadCarrito = (props) => {
	const { ProductoCodigo, PtoStockId, cantidad } = props;
	const classes = useStyles();

	const { handleCantidadCarrito, preciosPtoStock } = useContext(VentasContext);

	const [value, setValue] = useState(cantidad);
	const [maxVal, setMaxVal] = useState(0);

	useEffect(() => {
		setValue(cantidad);

		const product = preciosPtoStock.find(
			(x) => x.ProductoCodigo === ProductoCodigo && x.PtoStockId === PtoStockId
		);
		if (product) setMaxVal(product.cantidad);
	}, [cantidad]);

	const onChange = (e) => {
		let a = e.target.value;
		if (Number.isNaN(parseInt(a))) {
			a = 0;
		}

		setValue(e.target.value);

		handleCantidadCarrito(ProductoCodigo, PtoStockId, a);
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
