import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import BotonVerMasCarrito from '../tablas/componentes/BotonVerMasCarrito';
// import CollapseTablaCarrito from './CollapseTablaCarrito';
import VentasContext from '../../context/ventas/ventasContext';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
	negrita: {
		fontSize: 12,
		fontWeight: 'bold',
	},
});

const FilaCarrEnvio = () => {
	const classes = useStyles();

	const { envio, tiposEnvio, handleEnvio } = useContext(VentasContext);

	if (Object.keys(envio).length === 0) return null;
	if (envio.costo === 0 && envio.tipo === 1) return null;

	const tipoEnvio = (id, arrayTiposEnvio) => {
		const r = arrayTiposEnvio.find((x) => x.id === id);
		return r.descripcion;
	};

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell align="center">1</TableCell>
				<TableCell style={{ wordWrap: 'break-word', maxWidth: '250px' }}>
					<p className={classes.negrita}>Envío</p>
					<p>{`${tipoEnvio(envio.tipo, tiposEnvio)}`}</p>
				</TableCell>
				<TableCell align="center">
					{parseFloat(envio.costo).toFixed(2)}
				</TableCell>
				<TableCell align="center">
					{parseFloat(envio.costo).toFixed(2)}
				</TableCell>
				<TableCell align="center">
					<BotonFilaTabla
						contenido={
							<ClearIcon fontSize="default" color="error" fontSize="small" />
						}
						onClick={() => {
							handleEnvio({});
						}}
					/>
				</TableCell>
			</TableRow>
		</>
	);
};

export default FilaCarrEnvio;
