import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonVerMasCarrito from './BotonVerMasCarrito';
import BotonEliminarDeCarrito from './BotonBorrarDeCarrito';
import CollapseTablaCarrito from './CollapseTablaCarrito';
import PrecioEditableCarrito from './PrecioEditableCarrito';
import { calcSubtotCarr } from '../../../functions/ventas';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
});

const FilaCarrito = (props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [total, setTotal] = useState(0);

	const codigo = props.producto.codigo;
	const descripcion = props.producto.descripcion;
	const precio = props.producto.pu;
	const cantidad = props.producto.cantidad;
	const origen = props.producto.origen;

	useEffect(() => {
		const total = calcSubtotCarr(precio, cantidad);
		setTotal(total);
	}, [cantidad, precio]);

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell align="center">{cantidad}</TableCell>
				<TableCell style={{ wordWrap: 'break-word', maxWidth: '250px' }}>
					<p className={classes.negrita}>{codigo}</p>
					<p>{descripcion}</p>
				</TableCell>
				<TableCell align="center">
					<PrecioEditableCarrito codigo={codigo} precio={precio} />
				</TableCell>
				<TableCell align="center">{parseFloat(total).toFixed(2)}</TableCell>
				<TableCell align="center">
					<BotonEliminarDeCarrito codigoProducto={codigo} />
					<BotonVerMasCarrito setOpen={setOpen} open={open} />
				</TableCell>
			</TableRow>
			<CollapseTablaCarrito
				open={open}
				origen={origen}
				codigoProducto={codigo}
			/>
		</>
	);
};

export default FilaCarrito;
