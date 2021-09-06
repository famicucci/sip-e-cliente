import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import moment from 'moment';

const FilaGastos = (props) => {
	const { fila } = props;

	return (
		<RowColorIntercalado>
			<TableCell align="center">{fila.estado}</TableCell>
			<TableCell align="center">
				{moment(fila.createdAt).format('DD-MM-YYYY')}
			</TableCell>
			<TableCell align="left">{fila['GastoCategoria.id']}</TableCell>
			<TableCell align="left">{fila['GastoSubcategoria.id']}</TableCell>
			<TableCell align="left">{fila.descripcion}</TableCell>
			<TableCell align="center">
				{parseFloat(fila.importe).toFixed(2)}
			</TableCell>
		</RowColorIntercalado>
	);
};

export default FilaGastos;
