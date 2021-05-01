import React, { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { CantidadEditableContext } from '../../../context/CantidadEditableContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '13ch',
		},
	},
}));

const ValorCantidad = (props) => {
	const classes = useStyles();

	const { fila } = props;

	const { filaActiva, setNuevaCantidad, editar } = useContext(
		CantidadEditableContext
	);

	const [cantidadInput, setCantidadInput] = useState(fila.cantidad);

	useEffect(() => {
		setNuevaCantidad(cantidadInput);
	}, [cantidadInput]);

	useEffect(() => {
		setNuevaCantidad(cantidadInput);
		setCantidadInput(fila.cantidad);
	}, [filaActiva]);

	const onChange = (e) => {
		setCantidadInput(e.target.value);
	};

	return (
		<>
			{!editar(filaActiva.id, fila.id) ? (
				fila.cantidad
			) : (
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						id="outlined-number"
						label="Cantidad"
						type="number"
						value={cantidadInput}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						onChange={onChange}
					/>
				</form>
			)}
		</>
	);
};

export default ValorCantidad;
