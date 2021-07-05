import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	span: {
		marginRight: theme.spacing(1),
		fontWeight: 'bold',
	},
}));

const DireccionesCliente = ({ direcciones }) => {
	const classes = useStyles();

	let tabla = [];

	if (direcciones.length > 0) {
		for (let i = 0; i < direcciones.length; i++) {
			const x = direcciones[i];
			const fila = (
				<p>
					<span className={classes.span}>{`(${i + 1})`}</span>
					{`${x.calle} ${x.numeroCalle}, piso: ${x.piso}, depto: ${x.depto}, CP: ${x.codPostal}, ${x.barrio}, ${x.ciudad}`}
				</p>
			);
			tabla.push(fila);
		}
	} else if (direcciones.length === 0) {
		tabla = 'Este cliente no tiene direcciones cargadas';
	}

	return <>{tabla}</>;
};

export default DireccionesCliente;
