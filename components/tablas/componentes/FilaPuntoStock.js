import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import ValorCantidad from './ValorCantidadEditable';
import BotonCantidadEditable from './BotonCantidadEditable';
import TableCell from '@material-ui/core/TableCell';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaPuntoStock = (props) => {
	const { id, codigo, descripcion } = props.fila;

	return (
		<StyledTableRow key={id}>
			<TableCell component="th" scope="row">
				{codigo}
			</TableCell>
			<TableCell align="left">{descripcion}</TableCell>
			<TableCell align="center">
				<ValorCantidad fila={props.fila} />
			</TableCell>
			<TableCell align="center">
				<BotonCantidadEditable fila={props.fila} />
			</TableCell>
		</StyledTableRow>
	);
};

export default FilaPuntoStock;
