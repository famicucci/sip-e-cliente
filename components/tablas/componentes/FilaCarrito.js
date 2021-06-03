import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonVerMasCarrito from './BotonVerMasCarrito';
import BotonEliminarDeCarrito from './BotonBorrarDeCarrito';
import CollapseTablaCarrito from './CollapseTablaCarrito';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
});

const FilaCarrito = (props) => {
	const classes = useStyles();

	const codigo = props.producto.codigo;
	const descripcion = props.producto.descripcion;
	const precio = props.producto.pu;
	const cantidad = props.producto.cantidad;

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell align="center">{cantidad}</TableCell>
				<TableCell>
					<p className={classes.negrita}>{codigo}</p>
					<p>{descripcion}</p>
				</TableCell>
				<TableCell align="center">{precio}</TableCell>
				<TableCell align="center">{precio}</TableCell>
				<TableCell align="center">
					<BotonEliminarDeCarrito codigoProducto={codigo} />
					<BotonVerMasCarrito codigoProducto={codigo} />
				</TableCell>
			</TableRow>
			<CollapseTablaCarrito />
		</>
	);
};

export default FilaCarrito;
