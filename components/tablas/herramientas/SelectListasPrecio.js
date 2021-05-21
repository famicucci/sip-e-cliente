import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PreciosContext from '../../../context/precios/preciosContext';

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

const listas = [
	{ id: 1, nombre: 'Lista Minorista' },
	{ id: 2, nombre: 'Lista Mayorista' },
	{ id: 3, nombre: 'Lista con Descuento' },
];

const SelectListasPrecio = () => {
	const classes = useStyles();

	const { lista, handleLista } = useContext(PreciosContext);

	const handleChange = (event) => {
		handleLista(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				className={classes.selector}
				id="demo-simple-select-autowidth"
				value={lista}
				onChange={handleChange}
				autoWidth
				inputProps={{
					classes: {
						icon: classes.icon,
					},
				}}
			>
				{listas.map((lista) => (
					<MenuItem key={lista.id} value={lista.id}>
						{lista.nombre}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectListasPrecio;
