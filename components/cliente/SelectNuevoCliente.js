import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: '100%',
		margin: theme.spacing(1),
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SelectNuevoCliente = ({ name, label, ancho, data, valDefault }) => {
	const classes = useStyles();
	const [tipo, setTipo] = useState(valDefault);

	const handleChange = (event) => {
		setTipo(event.target.value);
	};

	return (
		<Grid item xs={ancho}>
			<FormControl className={classes.formControl}>
				<InputLabel shrink id="demo-simple-select-placeholder-label-label">
					{label}
				</InputLabel>
				<Select
					labelId="demo-simple-select-placeholder-label-label"
					id="demo-simple-select-placeholder-label"
					name={name}
					value={tipo}
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
