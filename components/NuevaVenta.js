import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BuscarProducto from './BuscarProducto';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	texto: { textAlign: 'right' },
}));

const NuevaVenta = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper} variant="outlined">
						<BuscarProducto />
						<p className={classes.texto}>Hola Como estas</p>
						<Divider variant="fullWidth" />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper} variant="outlined">
						xs=12 sm=6
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default NuevaVenta;
