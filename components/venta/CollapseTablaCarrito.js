import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import InputCantidadCarrito from '../tablas/componentes/InputCantidadCarrito';

const CollapseTablaCarrito = (props) => {
	const { open, origen, codigoProducto, direccion } = props;

	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
				<Collapse in={open} timeout="auto" unmountOnExit>
					{origen && codigoProducto ? (
						<Table size="small" aria-label="purchases">
							<TableBody>
								{origen.map((x, i) => (
									<TableRow key={i}>
										<TableCell align="left" style={{ width: 20 }}>
											<InputCantidadCarrito
												ProductoCodigo={codigoProducto}
												PtoStockId={x.PtoStockId}
												cantidad={x.cantidad}
											/>
										</TableCell>
										<TableCell>{x.ptoStockDescripcion}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : null}
					{direccion ? direccion.value : null}
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export default CollapseTablaCarrito;
