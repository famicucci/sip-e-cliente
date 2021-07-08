import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import Tippy from '@tippyjs/react';
import { IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

const FilaEditarClientes = ({ fila, colIndex }) => {
	const [nota, setNota] = useState(null);

	const handleOnShowDirecciones = (observaciones) => {
		const a = <p>{observaciones}</p>;
		setNota(a);
	};

	return (
		<TableRow hover>
			{colIndex['Nº'] ? (
				<TableCell align="center">{fila.idOrden}</TableCell>
			) : null}
			{colIndex['Estado'] ? (
				<TableCell align="center">{fila.ordenEstado}</TableCell>
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
					<Tippy
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
					</Tippy>
				</TableCell>
			) : null}
		</TableRow>
	);
};

export default FilaEditarClientes;
