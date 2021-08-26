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

	return (
		<>
			{direcciones.length > 0 ? (
				<>
					{direcciones.map((x, i) => (
						<p key={i} className={classes.p}>
							<SpanBold>{`${i + 1})`}</SpanBold>
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
					))}
				</>
			) : (
				<p>Este cliente no tiene direcciones cargadas</p>
			)}
		</>
	);
};

export default DireccionesCliente;
