import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputCantidadCarrito from './InputCantidadCarrito';

const CollapseTablaCarrito = ({ open, origen, codigoProducto }) => {
	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
				<Collapse in={open} timeout="auto" unmountOnExit>
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
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export default CollapseTablaCarrito;
