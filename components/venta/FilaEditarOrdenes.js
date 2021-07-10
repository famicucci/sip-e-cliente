import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import SelectOrdenEstado from './SelectOrdenEstado';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import BotonTippyHoverTabla from '../generales/BotonTippyHoverTabla';

const useStyles = makeStyles((theme) => ({
	estadoPago: {
		color: (props) =>
			props.estadoPago === 'Pago'
				? theme.palette.success.main
				: theme.palette.error.main,
		fontWeight: theme.typography.fontWeightMedium,
	},
}));

const FilaEditarClientes = ({ fila, colIndex }) => {
	const classes = useStyles(fila);

	return (
		<RowColorIntercalado>
			{colIndex['Nº'] ? (
				<TableCell align="center">{fila.idOrden}</TableCell>
			) : null}
			{colIndex['Estado'] ? (
				<TableCell align="center">
					<SelectOrdenEstado
						idOrden={fila.idOrden}
						ordenEstadoId={fila.ordenEstadoId}
					/>
				</TableCell>
			) : null}
			{colIndex['Cliente'] ? (
				<TableCell align="center">{`${fila.nombreCliente} ${fila.apellidoCliente}`}</TableCell>
			) : null}
			{colIndex['Fecha'] ? (
				<TableCell align="center">
					{moment(fila.fecha).format('DD-MM-YYYY')}
				</TableCell>
			) : null}
			{colIndex['Nº Fact.'] ? (
				<TableCell align="center">
					{fila.idFactura ? fila.idFactura : '-'}
				</TableCell>
			) : null}
			{colIndex['Estado Pago'] ? (
				<TableCell align="center">
					<span className={classes.estadoPago}>
						{fila.estadoPago ? fila.estadoPago : '-'}
					</span>
				</TableCell>
			) : null}
			{colIndex['M. Envío'] ? (
				<TableCell align="center">{fila.tipoEnvio}</TableCell>
			) : null}
			{colIndex['Nota'] ? (
				<TableCell align="left">
					{fila.observaciones ? (
						<BotonTippyHoverTabla
							icono={colIndex['Nota'].contenidoBoton}
							contenidoTippy={fila.observaciones}
						/>
					) : null}
				</TableCell>
			) : null}
		</RowColorIntercalado>
	);
};

export default FilaEditarClientes;
