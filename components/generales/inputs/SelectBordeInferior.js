import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
// import ClientesContext from '../../context/clientes/clientesContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: '100%',
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SelectNuevoCliente = ({
	name,
	label,
	ancho,
	data,
	valDefault,
	funcModState,
}) => {
	const classes = useStyles();

	const [valor, setValor] = useState(valDefault);

	// const { handleClienteActivo } = useContext(ClientesContext);

	const handleChange = (e) => {
		const desOpt = data.find((x) => x.value === e.target.value).descripcion;
		setValor(e.target.value);
		funcModState(e.target.name, desOpt);
	};

	return (
		<Grid item xs={ancho}>
			<FormControl className={classes.formControl}>
				<InputLabel shrink>{label}</InputLabel>
				<Select
					name={name}
					value={valor}
					onChange={handleChange}
					displayEmpty
					className={classes.selectEmpty}
				>
					{data.map((x) => (
						<MenuItem value={x.value}>{x.descripcion}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid>
	);
};

export default SelectNuevoCliente;
