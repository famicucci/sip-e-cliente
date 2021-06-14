import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablaCarrito from '../tablas/TablaCarrito';
import SeccionInferiorCarrito from './SeccionInferiorCarrito';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '100%',
		padding: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

const Carrito = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper} variant="outlined">
			<TablaCarrito />
			<SeccionInferiorCarrito />
		</Paper>
	);
};

export default Carrito;
