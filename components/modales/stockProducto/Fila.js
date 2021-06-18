import React, { useContext, useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CantidadStock from '../../tablas/componentes/CantidadStock';
import InputCantidadStock from '../../tablas/componentes/InputCantidadStock';
import StockContext from '../../../context/stock/stockContext';
import BotonFilaTabla from '../../tablas/componentes/BotonFilaTabla';
import BotonConfirmarCancelar from '../../tablas/componentes/BotonConfirmarCancelar';
import EditIcon from '@material-ui/icons/Edit';

const Fila = ({ fila }) => {
	const { filaActivaProducto, handleFilaActiva, modificarStock } =
		useContext(StockContext);

	return (
		<TableRow key={fila.id}>
			<TableCell component="th" scope="row">
				{fila['PtoStock.descripcion']}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				{filaActivaProducto.id !== fila.id ? (
					<CantidadStock cantidad={fila.cantidad} />
				) : (
					<InputCantidadStock cantidad={fila.cantidad} />
				)}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				{filaActivaProducto.id !== fila.id ? (
					<BotonFilaTabla
						contenido={<EditIcon />}
						onClick={() => {
							handleFilaActiva(fila);
						}}
					/>
				) : (
					<BotonConfirmarCancelar confirmar={modificarStock} />
				)}
			</TableCell>
		</TableRow>
	);
};

export default Fila;
