import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BotonVerMasCarrito from '../tablas/componentes/BotonVerMasCarrito';
import BotonEliminarDeCarrito from '../tablas/componentes/BotonBorrarDeCarrito';
import CollapseTablaCarrito from './CollapseTablaCarrito';
import PrecioEditableCarrito from '../tablas/componentes/PrecioEditableCarrito';
import { calcSubtotCarr } from '../../functions/ventas';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
});

const FilaCarrEnvio = (props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const { envio, tiposEnvio } = useContext(VentasContext);

	const tipoEnvio = (id, arrayTiposEnvio) => {
		console.log(id);
		console.log(arrayTiposEnvio);
		const r = arrayTiposEnvio.find((x) => arrayTiposEnvio.id === id);
		console.log(r);
		return r;
	};

	const codigo = 'Envío';
	const precio = envio.costo;
	const cantidad = 1;

	const descripcion = `tipo envio: ${tipoEnvio(
		envio.tipo,
		tiposEnvio
	)} y dirección`;
	const direccion = { value: 'Av. Julio a Roca 342' };

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell align="center">{cantidad}</TableCell>
				<TableCell style={{ wordWrap: 'break-word', maxWidth: '250px' }}>
					<p className={classes.negrita}>{codigo}</p>
					<p>{descripcion}</p>
				</TableCell>
				<TableCell align="center">{parseFloat(precio).toFixed(2)}</TableCell>
				<TableCell align="center">{parseFloat(precio).toFixed(2)}</TableCell>
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
