import React, { useContext, useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CantidadStock from './CantidadStock';
import InputCantidadStock from './InputCantidadStock';
import CantEditableContext from '../../../context/celdasEditables/cantEditable/cantEditableContext';
import StockContext from '../../../context/stock/stockContext';
import BotonEditar from '../../tablas/componentes/BotonEditar';
import BotonConfirmarCancelar from '../../tablas/componentes/BotonConfirmarCancelar';

const Fila = ({ fila }) => {
	const { idFilaActiva } = useContext(CantEditableContext);

	const [cantFila, setCantFila] = useState(null);

	useEffect(() => {
		setCantFila(fila.cantidad);
	}, []);

	return (
		<TableRow key={fila.id}>
			<TableCell component="th" scope="row">
				{fila['PtoStock.descripcion']}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				{idFilaActiva !== fila.id ? (
					<CantidadStock cantidad={cantFila} />
				) : (
					<InputCantidadStock cantidad={cantFila} setCantFila={setCantFila} />
				)}
			</TableCell>

			<TableCell style={{ width: 160 }} align="right">
				{idFilaActiva !== fila.id ? (
					<BotonEditar id={fila.id} />
				) : (
					<BotonConfirmarCancelar fila={fila} />
				)}
			</TableCell>
		</TableRow>
	);
};

export default Fila;
