import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: '100%',
		marginTop: theme.spacing(2),
		minWidth: 100,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SelectBordeInferior = ({
	name,
	label,
	ancho,
	data,
	valInit,
	placeholder,
	funcModState,
}) => {
	const classes = useStyles();

	const [valor, setValor] = useState(valInit);

	const handleChange = (e) => {
		setValor(e.target.value);
		funcModState(e.target.name, e.target.value);
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
					{
						(valInit = 'none' ? (
							<MenuItem value="none" disabled>
								<Typography color="textSecondary">{placeholder}</Typography>
							</MenuItem>
						) : null)
					}
					{data.map((x) => (
						<MenuItem value={x.id}>{x.descripcion}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid>
	);
};

export default SelectBordeInferior;
