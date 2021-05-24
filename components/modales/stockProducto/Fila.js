import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BotonCantidadEditable from '../../tablas/componentes/BotonCantidadEditable';
import ValorCantidad from '../../tablas/componentes/ValorCantidadEditable';

const Fila = ({ row }) => {
	return (
		<TableRow key={row.id}>
			<TableCell component="th" scope="row">
				{row['PtoStock.descripcion']}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				<ValorCantidad fila={row} />
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				<BotonCantidadEditable fila={row} />
			</TableCell>
		</TableRow>
	);
};

export default Fila;
