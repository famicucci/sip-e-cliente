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

const Fila = (props) => {
	return (
		<StyledTableRow>
			<TableCell component="th" scope="row">
				{props.fila.codigo}
			</TableCell>
			<TableCell align="left">{props.fila.descripcion}</TableCell>
			<TableCell align="right">{props.fila.precio}</TableCell>
		</StyledTableRow>
	);
};

export default Fila;
