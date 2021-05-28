import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CantidadStock from '../componentes/CantidadStock';
import BotonEditar from '../componentes/BotonEditar';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaPuntoStock = (props) => {
	const { id, ProductoCodigo, cantidad } = props.fila;

	return (
		<StyledTableRow key={id}>
			<TableCell component="th" scope="row">
				{ProductoCodigo}
			</TableCell>
			<TableCell align="left">{props.fila['Producto.descripcion']}</TableCell>
			<TableCell align="center">
				<CantidadStock cantidad={cantidad} />
			</TableCell>
			<TableCell align="center">
				<BotonEditar fila={props.fila} />
			</TableCell>
		</StyledTableRow>
	);
};

export default FilaPuntoStock;
