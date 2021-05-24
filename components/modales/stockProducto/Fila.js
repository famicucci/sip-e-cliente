import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BotonCantidadEditable from '../../tablas/componentes/BotonCantidadEditable';
import ValorCantidad from '../../tablas/componentes/ValorCantidadEditable';

const Fila = ({ fila }) => {
	return (
		<TableRow key={fila.id}>
			<TableCell component="th" scope="row">
				{fila['PtoStock.descripcion']}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				<ValorCantidad fila={fila} />
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				<BotonCantidadEditable fila={fila} />
			</TableCell>
		</TableRow>
	);
};

export default Fila;
