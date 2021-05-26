import React, { useContext, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import StockContext from '../../../context/stock/stockContext';
import CantEditableContext from '../../../context/celdasEditables/cantEditable/cantEditableContext';
import Fila from './Fila';

const Tabla = () => {
	const { productoActivo } = useContext(StockContext);
	const { productoActivoState } = useContext(CantEditableContext);

	useEffect(() => {
		productoActivoState(productoActivo);
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{productoActivo.map((fila) => (
						<Fila fila={fila} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Tabla;
