import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CropFreeIcon from '@material-ui/icons/CropFree';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '150%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const LineaEsperandoCodigo = () => {
	const classes = useStyles();

	// las lineas deben ser pequeñas y estar en el medio
	// el lector debe estar en color gris clarito
	// las lineas tambien en gris clarito
	// el texto tambien en gris clarito

	return (
		<div className={classes.root}>
			<CropFreeIcon fontSize="large" />
			<LinearProgress color="secondary" variant="query" />
			<LinearProgress color="secondary" />
			<p align="center">Esperando codigo de producto...</p>
		</div>
	);
};

export default LineaEsperandoCodigo;
