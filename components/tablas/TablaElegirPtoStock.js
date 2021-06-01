import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BotonAgregarCarrito from './componentes/BotonAgregarCarrito';

const TablaElegirPtoStock = () => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell component="th" scope="row" style={{ minWidth: 170 }}>
							Showroom
						</TableCell>

						<TableCell style={{ width: 70 }} align="right">
							<BotonAgregarCarrito cantidad={11} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row" style={{ minWidth: 170 }}>
							Depósito
						</TableCell>

						<TableCell style={{ width: 70 }} align="right">
							<BotonAgregarCarrito cantidad={11} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row" style={{ minWidth: 170 }}>
							Outlet
						</TableCell>

						<TableCell style={{ width: 70 }} align="right">
							<BotonAgregarCarrito cantidad={11} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row" style={{ minWidth: 170 }}>
							Mercado Libre
						</TableCell>

						<TableCell style={{ width: 70 }} align="right">
							<BotonAgregarCarrito cantidad={11} />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaElegirPtoStock;
