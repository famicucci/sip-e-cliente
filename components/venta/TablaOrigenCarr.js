import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputCantidadCarrito from '../tablas/componentes/InputCantidadCarrito';

const CollapseTablaCarrito = ({ origen, codigoProducto }) => {
	return (
		<Table size="small" aria-label="purchases">
			<TableBody>
				{origen.map((fila) => (
					<TableRow>
						<TableCell align="left" style={{ width: 20 }}>
							<InputCantidadCarrito
								codigoProducto={codigoProducto}
								ptoStock={fila.ptoStockId}
								cantidad={fila.cantidad}
							/>
						</TableCell>
						<TableCell>{fila.ptoStockDescripcion}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default CollapseTablaCarrito;
