import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import StockContext from '../../../context/stock/stockContext';
import Fila from './Fila';

const Tabla = () => {
	const { productoActivo } = useContext(StockContext);

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
