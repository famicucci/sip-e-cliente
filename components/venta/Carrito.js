import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablaCarrito from '../tablas/TablaCarrito';
import SeccionInferiorCarrito from './SeccionInferiorCarrito';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '86vh',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
}));

const Carrito = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper} variant="outlined">
			<div className={classes.container}>
				<TablaCarrito />
				<SeccionInferiorCarrito />
			</div>
		</Paper>
	);
};

export default Carrito;
