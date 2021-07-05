import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const FilaCliente = (props) => {
	const { nombre, apellido, email } = props.fila;

	return (
		<TableRow hover>
			<TableCell component="th" scope="row">
				{`${nombre} ${apellido}`}
			</TableCell>
			<TableCell align="left">{email}</TableCell>
			<TableCell align="left">{props.boton}</TableCell>
		</TableRow>
	);
};

export default FilaCliente;
