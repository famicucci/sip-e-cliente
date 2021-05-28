import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StockContext from '../../../context/stock/stockContext';
import BarraHerramientasContext from '../../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	altura: {
		paddingY: '10px',
	},
	selector: {
		color: '#fff',
		'&::before': {
			borderColor: '#fff',
		},
		'&:hover': {
			backgroundColor: '#6F7DC8',
		},
		'&:hover:before': {
			backgroundColor: '#fff',
			height: 2,
			display: 'none',
		},
	},
	icon: {
		fill: '#fff',
	},
}));

const SelectPuntosStock = () => {
	const classes = useStyles();

	const { ptosStock, traerPtosStock } = useContext(BarraHerramientasContext);

	const { ptoStock, handlePtoStock } = useContext(StockContext);

	useEffect(() => {
		traerPtosStock();
	}, []);

	const handleChange = (event) => {
		handlePtoStock(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				className={classes.selector}
				value={ptoStock}
				onChange={handleChange}
				autoWidth
				inputProps={{
					classes: {
						icon: classes.icon,
					},
				}}
			>
				{ptosStock
					? ptosStock.map((ptoStock) => (
							<MenuItem key={ptoStock.id} value={ptoStock.id}>
								{ptoStock.descripcion}
							</MenuItem>
					  ))
					: null}
			</Select>
		</FormControl>
	);
};

export default SelectPuntosStock;
