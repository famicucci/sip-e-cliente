import React, { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CantEditableContext from '../../../context/celdasEditables/cantEditable/cantEditableContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '13ch',
		},
	},
}));

const ValorCantidad = ({ fila }) => {
	const classes = useStyles();

	const { filaActiva } = useContext(CantEditableContext);

	return (
		<>
			{filaActiva.id !== fila.id ? (
				fila.cantidad
			) : (
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						id="outlined-number"
						label="Cantidad"
						type="number"
						value={cantidad}
						InputLabelProps={{
							shrink: true,
						}}
						InputProps={{
							inputProps: {
								min: 0,
							},
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
