import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const FilaCliente = (props) => {
	const { nombre, apellido, email } = props.fila;

	return (
		<TableRow hover>
			<TableCell component="th" scope="row">
				{`${nombre} ${apellido}`}
			</TableCell>
			<TableCell align="left">{email}</TableCell>
			<TableCell align="left">
				<IconButton
					size="small"
					// color="secondary"
					// onClick={() => handleClick(codigo, ptoStock)}
				>
					<AddIcon fontSize="default" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default FilaCliente;
