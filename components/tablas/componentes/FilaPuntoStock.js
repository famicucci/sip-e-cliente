import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CantidadStock from '../componentes/CantidadStock';
import BotonEditar from '../componentes/BotonEditar';
import StockContext from '../../../context/stock/stockContext';
import BotonConfirmarCancelar from '../componentes/BotonConfirmarCancelar';
import InputCantidadStock from '../componentes/InputCantidadStock';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaPuntoStock = (props) => {
	const { id, ProductoCodigo, cantidad } = props.fila;

	const { filaActivaProducto, modificarStockPtoStock } =
		useContext(StockContext);

	return (
		<StyledTableRow key={id}>
			<TableCell component="th" scope="row">
				{ProductoCodigo}
			</TableCell>
			<TableCell align="left">{props.fila['Producto.descripcion']}</TableCell>
			<TableCell align="center">
				{filaActivaProducto.id !== id ? (
					<CantidadStock cantidad={cantidad} />
				) : (
					<InputCantidadStock cantidad={cantidad} />
				)}
			</TableCell>
			<TableCell align="center">
				{filaActivaProducto.id !== id ? (
					<BotonEditar fila={props.fila} />
				) : (
					<BotonConfirmarCancelar confirmar={modificarStockPtoStock} />
				)}
			</TableCell>
		</StyledTableRow>
	);
};

export default FilaPuntoStock;
