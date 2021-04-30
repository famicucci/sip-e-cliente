import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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

	const { idFila, valor, filaActiva, editar } = props;

	const [cantidad, setCantidad] = useState(valor);

	const onChange = (e) => {
		setCantidad(e.target.value);
	};

	return (
		<>
			{editar(filaActiva, idFila) ? (
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						id="outlined-number"
						label="Cantidad"
						type="number"
						value={cantidad}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						onChange={onChange}
					/>
				</form>
			) : (
				cantidad
			)}
		</>
	);
};

export default ValorCantidad;
