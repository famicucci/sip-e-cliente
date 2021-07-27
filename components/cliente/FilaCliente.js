import React, { useState, useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import Tippy from '@tippyjs/react';
import { IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import DireccionesCliente from './DireccionesCliente';
import BotonSinFormato from '../generales/BotonSinFormato';
import ClientesContext from '../../context/clientes/clientesContext';

const FilaCliente = ({ fila, colIndex }) => {
	const [direccionesCliente, setDireccionesCliente] = useState(null);

	const { handleFilaActiva, handleOpenModalInformacionCliente } =
		useContext(ClientesContext);

	const handleOnShowDirecciones = (direcciones) => {
		const a = <DireccionesCliente direcciones={direcciones} />;
		setDireccionesCliente(a);
	};

	return (
		<TableRow hover>
			{/* <TableCell component="th" scope="row">
				{`${fila.nombre} ${fila.apellido}`}
			</TableCell> */}
			<TableCell align="center">
				<BotonSinFormato
					onClick={() => {
						console.log(fila.id);
						handleFilaActiva(fila.id);
						handleOpenModalInformacionCliente(true);
					}}
				>
					{`${fila.nombre} ${fila.apellido}`}
				</BotonSinFormato>
			</TableCell>
			<TableCell align="left">{fila.email}</TableCell>
			{colIndex['Celular'] ? (
				<TableCell align="left">{fila.celular}</TableCell>
			) : null}
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
					<Tippy
						content={direccionesCliente}
						interactive={true}
						theme={'light-border'}
						placement={'left'}
						onShow={() => {
							handleOnShowDirecciones(fila.direcciones);
						}}
					>
						<IconButton size="small">
							{colIndex['Direcciones'].contenidoBoton}
						</IconButton>
					</Tippy>
				</TableCell>
			) : null}
			{colIndex['Ver Más'] ? (
				<TableCell align="center">
					<BotonFilaTabla
						contenido={colIndex['Ver Más'].contenidoBoton}
						onClick={() => {
							colIndex['Ver Más'].funcBoton(fila);
						}}
					/>
				</TableCell>
			) : null}
		</TableRow>
	);
};

export default FilaCliente;
