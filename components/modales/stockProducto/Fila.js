import React, { useContext, useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CantidadStock from './CantidadStock';
import InputCantidadStock from './InputCantidadStock';
import StockContext from '../../../context/stock/stockContext';
import BotonEditar from './BotonEditar';
import BotonConfirmarCancelar from './BotonConfirmarCancelar';

const Fila = ({ fila }) => {
	const { filaActivaProducto } = useContext(StockContext);

	return (
		<TableRow key={fila.id}>
			<TableCell component="th" scope="row">
				{fila['PtoStock.descripcion']}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				{filaActivaProducto.id !== fila.id ? (
					<CantidadStock fila={fila} />
				) : (
					<InputCantidadStock fila={fila} />
				)}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				{filaActivaProducto.id !== fila.id ? (
					<BotonEditar fila={fila} />
				) : (
					<BotonConfirmarCancelar fila={fila} />
				)}
			</TableCell>
		</TableRow>
	);
};

export default Fila;
