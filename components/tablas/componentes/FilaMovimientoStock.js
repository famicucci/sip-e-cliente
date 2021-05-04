import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaMovimientoStock = (props) => {
	const {
		codigo,
		descripcion,
		cantidad,
		puntoStock,
		fecha,
		usuario,
		motivo,
	} = props.fila;

	return (
		<StyledTableRow>
			<TableCell component="th" scope="row">
				{codigo}
			</TableCell>
			<TableCell align="left">{descripcion}</TableCell>
			<TableCell align="center">{cantidad}</TableCell>
			<TableCell align="center">{puntoStock}</TableCell>
			<TableCell align="center">{fecha}</TableCell>
			<TableCell align="center">{usuario}</TableCell>
			<TableCell align="center">{motivo}</TableCell>
		</StyledTableRow>
	);
};

export default FilaMovimientoStock;
