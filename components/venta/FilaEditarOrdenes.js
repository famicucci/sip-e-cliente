import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import SelectOrdenEstado from './SelectOrdenEstado';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import BotonTippyHoverTabla from '../generales/BotonTippyHoverTabla';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import BotonCustonFilaTabla from '../generales/BotonCustomFilaTabla';
import BotonSinFormato from '../generales/BotonSinFormato';
import VentasContext from '../../context/ventas/ventasContext';

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

	const { handleFilaActivaOrden, handleOpenModalDetalleOrden } =
		useContext(VentasContext);

	return (
		<RowColorIntercalado>
			{colIndex['Nº'] ? (
				<TableCell align="center">
					<BotonFilaTabla
						contenido={fila.idOrden}
						onClick={() => {
							handleFilaActivaOrden(fila.idOrden);
							handleOpenModalDetalleOrden();
						}}
					/>
				</TableCell>
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
				<TableCell align="center">
					<BotonSinFormato>
						{`${fila.nombreCliente} ${fila.apellidoCliente}`}
					</BotonSinFormato>
				</TableCell>
			) : null}
			{colIndex['Fecha'] ? (
				<TableCell align="center">
					{moment(fila.fecha).format('DD-MM-YYYY')}
				</TableCell>
			) : null}
			{colIndex['Nº Fact.'] ? (
				<TableCell align="center">
					<BotonCustonFilaTabla>
						{fila.idFactura ? fila.idFactura : 'Crear Factura'}
					</BotonCustonFilaTabla>
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
