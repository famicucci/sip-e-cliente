import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonVerMasCarrito from '../tablas/componentes/BotonVerMasCarrito';
import BotonEliminarDeCarrito from '../tablas/componentes/BotonBorrarDeCarrito';
import CollapseTablaCarrito from './CollapseTablaCarrito';
import PrecioEditableCarrito from '../tablas/componentes/PrecioEditableCarrito';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
});

const FilaCarrito = (props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const codigo = props.producto.codigo;
	const descripcion = props.producto.descripcion;
	const precio = props.producto.pu;
	const origen = props.producto.origen;

	const sumTotalQty = (origen) => {
		let r = 0;
		origen.forEach((x) => {
			r += x.cantidad;
		});
		return r;
	};

	const sumTotalPrice = () => {
		const qty = sumTotalQty(origen);
		const r = precio * qty;
		return r;
	};

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell align="center">{sumTotalQty(origen)}</TableCell>
				<TableCell style={{ wordWrap: 'break-word', maxWidth: '250px' }}>
					<p className={classes.negrita}>{codigo}</p>
					<p>{descripcion}</p>
				</TableCell>
				<TableCell align="center">
					<PrecioEditableCarrito codigo={codigo} precio={precio} />
				</TableCell>
				<TableCell align="center">
					{parseFloat(sumTotalPrice()).toFixed(2)}
				</TableCell>
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
