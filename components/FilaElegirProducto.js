import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonAgregarCarrito from './BotonAgregarCarrito';

const useStyles = makeStyles({
	negrita: {
		fontSize: 13,
		fontWeight: 'bold',
	},
});

const FilaElegirProducto = (props) => {
	const classes = useStyles();

	const { codigo, descripcion, precio } = props.fila;
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell>
				<p className={classes.negrita}>{codigo}</p>
				<p>{descripcion}</p>
			</TableCell>
			<TableCell align="center">{precio}</TableCell>
			<TableCell align="center">
				<BotonAgregarCarrito />
			</TableCell>
		</TableRow>
	);
};

export default FilaElegirProducto;
