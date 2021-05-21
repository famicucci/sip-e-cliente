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
	const { ProductoCodigo, pu } = props.fila;
	const { descripcion } = props.fila.Producto;

	return (
		<StyledTableRow>
			<TableCell component="th" scope="row">
				{ProductoCodigo}
			</TableCell>
			<TableCell align="left">{descripcion}</TableCell>
			<TableCell align="right">{pu}</TableCell>
		</StyledTableRow>
	);
};

export default Fila;
