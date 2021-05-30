import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const FilaElegirProducto = (props) => {
	console.log(props.fila);
	const { codigo, descripcion, precio } = props.fila;
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell>{codigo}</TableCell>
			<TableCell>{descripcion}</TableCell>
			<TableCell>{precio}</TableCell>
		</TableRow>
	);
};

export default FilaElegirProducto;
