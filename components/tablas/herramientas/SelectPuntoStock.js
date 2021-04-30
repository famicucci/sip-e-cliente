import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { BarraHerramientasContext } from '../../../context/BarraHerramientasContext';

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

const puntosStock = [
	{ id: 1, nombre: 'Showroom' },
	{ id: 2, nombre: 'Depósito' },
	{ id: 3, nombre: 'Mercado Libre' },
	{ id: 6, nombre: 'Outlet' },
];

const SelectPuntosStock = () => {
	const classes = useStyles();

	const { puntoStock, setPuntoStock } = useContext(BarraHerramientasContext);

	const handleChange = (event) => {
		setPuntoStock(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				className={classes.selector}
				value={puntoStock}
				onChange={handleChange}
				autoWidth
				inputProps={{
					classes: {
						icon: classes.icon,
					},
				}}
			>
				{puntosStock.map((puntoStock) => (
					<MenuItem key={puntoStock.id} value={puntoStock.id}>
						{puntoStock.nombre}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectPuntosStock;
