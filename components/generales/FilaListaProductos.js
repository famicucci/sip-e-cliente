import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import BotonTippyHoverTabla from '../generales/BotonTippyHoverTabla';

const FilaListaProductos = ({ fila, colIndex }) => {
	return (
		<RowColorIntercalado>
			{colIndex['Código'] ? (
				<TableCell align="center">{fila.ProductoCodigo}</TableCell>
			) : null}
			{colIndex['Descripción'] ? (
				<TableCell align="left">{fila.Producto.descripcion}</TableCell>
			) : null}
			{colIndex['Cantidad'] ? (
				<TableCell align="center">{fila.cantidad}</TableCell>
			) : null}
			{colIndex['Precio'] ? (
				<TableCell align="center">{fila.pu}</TableCell>
			) : null}
			{colIndex['Total'] ? (
				<TableCell align="center">
					{(fila.cantidad * fila.pu).toFixed(2)}
				</TableCell>
			) : null}
			{colIndex['Origen'] ? (
				<TableCell align="center">
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
