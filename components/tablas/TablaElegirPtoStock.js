import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BotonAgregarCarrito from './componentes/BotonAgregarCarrito';
import VentasContext from '../../context/ventas/ventasContext';
import { filPtosStockProd } from '../../functions/filtroTablas';

const TablaElegirPtoStock = ({ codigo }) => {
	const { preciosPtoStock, listaPrecio } = useContext(VentasContext);

	const r = filPtosStockProd(preciosPtoStock, codigo, listaPrecio);
	const ptosStockProd = r.filter((x) => x.cantidad !== 0);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{ptosStockProd.length > 0 ? (
						ptosStockProd.map((fila) => (
							<TableRow>
								<TableCell component="th" scope="row" style={{ minWidth: 170 }}>
									{fila['PtoStock.descripcion']}
								</TableCell>

								<TableCell style={{ width: 70 }} align="right">
									<BotonAgregarCarrito
										cantidad={fila.cantidad}
										codigo={fila.ProductoCodigo}
										ptoStock={fila.PtoStockId}
									/>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell>No hay más productos en stock</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaElegirPtoStock;
