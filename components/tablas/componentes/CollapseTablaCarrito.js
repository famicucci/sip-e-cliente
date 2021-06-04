import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CollapseTablaCarrito = ({ open, origen }) => {
	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box margin={1}>
						<Table size="small" aria-label="purchases">
							<TableHead>
								<TableRow>
									<TableCell>Pto. Stock</TableCell>
									<TableCell align="center">Cant.</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{origen.map((fila) => (
									<TableRow>
										<TableCell component="th" scope="row">
											{fila.ptoStockDescripcion}
										</TableCell>
										<TableCell align="center">{fila.cantidad}</TableCell>
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
