import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonAgregarCarrito from './BotonAgregarCarrito';
import VentasContext from '../../../context/ventas/ventasContext';
import BotonElegirPtoStock from './BotonElegirPtoStock';

const useStyles = makeStyles({
	negrita: {
		fontSize: 13,
		fontWeight: 'bold',
	},
});

const FilaElegirProducto = (props) => {
	const classes = useStyles();

	const { valorRadio } = useContext(VentasContext);

	const codigo = props.fila.ProductoCodigo;
	const descripcion = props.fila['Producto.descripcion'];
	const precio = props.fila['Producto.Precios.pu'];
	const cantidad = props.fila.cantidad;

	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell>
				<p className={classes.negrita}>{codigo}</p>
				<p>{descripcion}</p>
			</TableCell>
			<TableCell align="center">{precio}</TableCell>
			<TableCell align="center">
				{valorRadio === 'pto-stock' || valorRadio === 'sin-stock' ? (
					<BotonAgregarCarrito cantidad={cantidad} />
				) : null}
				{valorRadio === 'total' ? (
					<BotonElegirPtoStock cantidad={cantidad} codigoProducto={codigo} />
				) : null}
			</TableCell>
		</TableRow>
	);
};

export default FilaElegirProducto;
