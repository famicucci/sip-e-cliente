import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablaCarrito from '../tablas/TablaCarrito';
import SeccionInferiorCarrito from './SeccionInferiorCarrito';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '86vh',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	contenedor: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	tabla: {
		flexGrow: 1,
	},
}));

const Carrito = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper} variant="outlined">
			<Box className={classes.contenedor}>
				<Box className={classes.tabla}>
					<TablaCarrito />
				</Box>
				<Box>
					<SeccionInferiorCarrito />
				</Box>
			</Box>
		</Paper>
	);
};

export default Carrito;
