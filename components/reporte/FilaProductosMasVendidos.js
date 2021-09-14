import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';

const FilaProductosMasVendidos = (props) => {
	const { ProductoCodigo, pu } = props.fila;

	return (
		<RowColorIntercalado>
			<TableCell component="th" scope="row">
				{ProductoCodigo}
			</TableCell>
			<TableCell align="left">{props.fila['Producto.descripcion']}</TableCell>
			<TableCell align="center">{pu}</TableCell>
			<TableCell align="center">{pu}</TableCell>
		</RowColorIntercalado>
	);
};

export default FilaProductosMasVendidos;
