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

	const { handleCarrito, preciosPtoStock } = useContext(VentasContext);

	const [value, setValue] = useState(cantidad);

	useEffect(() => {
		setValue(cantidad);
	}, [cantidad]);

	const onChange = (e) => {
		let a = e.target.value;
		if (Number.isNaN(parseInt(a))) a = 0;
		setValue(a);
	};

	const onBlur = () => {
		const product = getProduct(preciosPtoStock, ProductoCodigo, PtoStockId);

		const qty = value - cantidad;
		handleCarrito(product, qty);
	};

	const getProduct = (preciosPtoStock, ProductoCodigo, PtoStockId) => {
		const product = preciosPtoStock.find(
			(x) => x.ProductoCodigo === ProductoCodigo && x.PtoStockId === PtoStockId
		);
		return product;
	};

	const setMaxValue = () => {
		const product = getProduct(preciosPtoStock, ProductoCodigo, PtoStockId);
		if (product) return product.cantidad;
	};

	return (
		<div>
			<TextField
				className={classes.input}
				type="number"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				InputProps={{
					inputProps: {
						min: 0,
						max: setMaxValue(),
					},
				}}
			/>
		</div>
	);
};

export default InputCantidadCarrito;
