import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';

const FilaCliente = ({ fila, colIndex }) => {
	console.log(fila);

	return (
		<TableRow hover>
			<TableCell component="th" scope="row">
				{`${fila.nombre} ${fila.apellido}`}
			</TableCell>
			<TableCell align="left">{fila.email}</TableCell>
			{colIndex['Razon Social'] ? (
				<TableCell align="left">{fila.razonSocial}</TableCell>
			) : null}
			{colIndex['Observaciones'] ? (
				<TableCell align="left">{fila.observaciones}</TableCell>
			) : null}
			{colIndex['Cond. IVA'] ? (
				<TableCell align="left">{fila.condIva}</TableCell>
			) : null}
			{colIndex['Creación'] ? (
				<TableCell align="left">
					{moment(fila.createdAt).format('DD-MM-YYYY')}
				</TableCell>
			) : null}
			{colIndex['Celular'] ? (
				<TableCell align="left">{fila.celular}</TableCell>
			) : null}
			{colIndex['Tipo'] ? (
				<TableCell align="left">{fila.tipo}</TableCell>
			) : null}
			{colIndex['Agregar'] ? (
				<TableCell align="center">
					<BotonFilaTabla
						contenido={colIndex['Agregar'].contenidoBoton}
						onClick={() => {
							colIndex['Agregar'].funcBoton(fila);
						}}
					/>
				</TableCell>
			) : null}
			{colIndex['Direcciones'] ? (
				<TableCell align="left">
					<BotonFilaTabla
						contenido={colIndex['Direcciones'].contenidoBoton}
						// onClick={() => {
						// 	colIndex['Agregar'].funcBoton(fila);
						// }}
					/>
				</TableCell>
			) : null}
		</TableRow>
	);
};

export default FilaCliente;
