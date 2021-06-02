import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BotonAgregarCarrito from './componentes/BotonAgregarCarrito';

const TablaElegirPtoStock = ({ producto }) => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{producto.map((fila) => (
						<TableRow>
							<TableCell component="th" scope="row" style={{ minWidth: 170 }}>
								{fila['PtoStock.descripcion']}
							</TableCell>

							<TableCell style={{ width: 70 }} align="right">
								<BotonAgregarCarrito
									cantidad={fila.cantidad}
									codigo={fila.ProductoCodigo}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaElegirPtoStock;
