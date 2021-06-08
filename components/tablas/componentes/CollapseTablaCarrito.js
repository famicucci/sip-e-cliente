import React from 'react';
import Box from '@material-ui/core/Box';
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
					<Box margin={0}>
						<Table size="small" aria-label="purchases">
							<TableBody>
								{origen.map((fila) => (
									<TableRow>
										<TableCell align="left">
											<InputCantidadCarrito
												codigoProducto={codigoProducto}
												ptoStock={fila.ptoStockId}
												cantidad={fila.cantidad}
											/>
											{/* {fila.cantidad} */}
										</TableCell>
										<TableCell component="th" scope="row">
											{fila.ptoStockDescripcion}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export default CollapseTablaCarrito;
