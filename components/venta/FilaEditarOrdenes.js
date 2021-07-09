import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import Tippy from '@tippyjs/react';
import { IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import SelectOrdenEstado from './SelectOrdenEstado';
import RowColorIntercalado from '../generales/RowColorIntercalado';

const FilaEditarClientes = ({ fila, colIndex }) => {
	const [nota, setNota] = useState(null);

	const handleOnShowDirecciones = (observaciones) => {
		const a = <p>{observaciones}</p>;
		setNota(a);
	};

	return (
		<RowColorIntercalado>
			{colIndex['Nº'] ? (
				<TableCell align="center">{fila.idOrden}</TableCell>
			) : null}
			{colIndex['Estado'] ? (
				<TableCell align="center">
					{/* <p>
						{fila.ordenEstadoId} {fila.ordenEstado}
					</p> */}
					{/* <p>{fila.ordenEstadoId}</p> */}
					<SelectOrdenEstado idOrden={fila.idOrden} estado={fila.ordenEstado} />
				</TableCell>
			) : null}
			{colIndex['Cliente'] ? (
				<TableCell align="center">{`${fila.nombreCliente} ${fila.apellidoCliente}`}</TableCell>
			) : null}
			{colIndex['Fecha'] ? (
				<TableCell align="center">
					{moment(fila.fecha).format('DD-MM-YYYY')}
				</TableCell>
			) : null}
			{colIndex['Nº Fact.'] ? (
				<TableCell align="center">
					{fila.idFactura ? fila.idFactura : '-'}
				</TableCell>
			) : null}
			{colIndex['Estado Pago'] ? (
				<TableCell align="center">
					{fila.estadoPago ? fila.estadoPago : '-'}
				</TableCell>
			) : null}
			{colIndex['M. Envío'] ? (
				<TableCell align="center">{fila.tipoEnvio}</TableCell>
			) : null}
			{colIndex['Nota'] ? (
				<TableCell align="left">
					{/* <Tippy
						content={nota}
						interactive={true}
						theme={'light-border'}
						placement={'left'}
						onShow={() => {
							handleOnShowDirecciones(fila.observaciones);
						}}
					>
						{fila.observaciones ? (
							<IconButton size="small">
								{colIndex['Nota'].contenidoBoton}
							</IconButton>
						) : null}
					</Tippy> */}
				</TableCell>
			) : null}
		</RowColorIntercalado>
	);
};

export default FilaEditarClientes;
