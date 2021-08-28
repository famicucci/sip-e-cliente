import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import BotonTippyHoverTabla from '../generales/BotonTippyHoverTabla';

const useStyles = makeStyles((theme) => ({
	regalo: {
		color: (props) => (props.pu === 0 ? theme.palette.success.main : null),
	},
}));

const FilaListaProductos = ({ fila, colIndex }) => {
	const classes = useStyles({ pu: parseFloat(fila.pu) });

	return (
		<RowColorIntercalado>
			{colIndex['Código'] ? (
				<TableCell className={classes.regalo} align="center">
					{fila.ProductoCodigo}
				</TableCell>
			) : null}
			{colIndex['Descripción'] ? (
				<TableCell className={classes.regalo} align="left">
					{fila.Producto.descripcion}
				</TableCell>
			) : null}
			{colIndex['Cantidad'] ? (
				<TableCell className={classes.regalo} align="center">
					{fila.cantidad}
				</TableCell>
			) : null}
			{colIndex['Precio'] ? (
				<TableCell className={classes.regalo} align="center">
					{fila.pu}
				</TableCell>
			) : null}
			{colIndex['Total'] ? (
				<TableCell className={classes.regalo} align="center">
					{(fila.cantidad * fila.pu).toFixed(2)}
				</TableCell>
			) : null}
			{colIndex['Origen'] ? (
				<TableCell className={classes.regalo} align="center">
					{fila.origen === 'Producción' ? (
						<BotonTippyHoverTabla
							icono={colIndex['Origen'].contenidoBoton}
							contenidoTippy={<p>Producto a pedido o en producción</p>}
						/>
					) : null}
				</TableCell>
			) : null}
		</RowColorIntercalado>
	);
};

export default FilaListaProductos;
