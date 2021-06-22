import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonVerMasCarrito from '../tablas/componentes/BotonVerMasCarrito';
import BotonEliminarDeCarrito from '../tablas/componentes/BotonBorrarDeCarrito';
import CollapseTablaCarrito from './CollapseTablaCarrito';
import PrecioEditableCarrito from '../tablas/componentes/PrecioEditableCarrito';
import { calcSubtotCarr } from '../../functions/ventas';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
});

const FilaCarrEnvio = (props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [total, setTotal] = useState(0);

	const codigo = 'Envío';
	const descripcion = 'tipo y dirección';
	const precio = 345;
	const cantidad = 1;
	const direccion = { value: 'Av. Julio a Roca 342' };

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
			<CollapseTablaCarrito open={open} direccion={direccion} />
		</>
	);
};

export default FilaCarrEnvio;
