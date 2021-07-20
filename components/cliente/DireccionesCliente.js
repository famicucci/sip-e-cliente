import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	p: {
		lineHeight: theme.spacing(0.2),
	},
}));

const BoxSpan = (props) => {
	return (
		<Box {...props} component="span">
			{props.children}
		</Box>
	);
};

const SpanBold = withStyles((theme) => ({
	root: {
		marginRight: theme.spacing(1),
		fontWeight: 'bold',
	},
}))(BoxSpan);

const DireccionesCliente = ({ direcciones }) => {
	const classes = useStyles();

	let tabla = [];

	if (direcciones.length > 0) {
		for (let i = 0; i < direcciones.length; i++) {
			const x = direcciones[i];
			const fila = (
				<p className={classes.p}>
					<SpanBold>{`(${i + 1})`}</SpanBold>
					<SpanBold>calle:</SpanBold>
					{`${x.calle} ${x.numeroCalle}, `}
					<SpanBold>piso:</SpanBold>
					{`${x.piso}, `}
					<SpanBold>depto:</SpanBold>
					{`${x.depto}, `}
					<SpanBold>cp:</SpanBold>
					{`${x.codPostal}, `}
					<SpanBold>barrio:</SpanBold>
					{x.barrio ? `${x.barrio}, ` : '- , '}
					<SpanBold>ciudad:</SpanBold>
					{x.ciudad ? `${x.ciudad}, ` : '- , '}
					<SpanBold>referencia:</SpanBold>
					{x.refDireccion ? `${x.refDireccion}` : '- . '}
				</p>
			);
			tabla.push(fila);
		}
	} else if (direcciones.length === 0) {
		tabla = <p>Este cliente no tiene direcciones cargadas</p>;
	}

	return <>{tabla}</>;
};

export default DireccionesCliente;
