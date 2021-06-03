import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TotalCarrito from './TotalCarrito';
import BotoneraCarrito from './BotoneraCarrito';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(0.5),
		padding: theme.spacing(1.5),
	},
}));

const SeccionInferiorCarrito = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.root} variant="elevation">
			<TotalCarrito />
			<Divider variant="fullWidth" />
			<BotoneraCarrito />
		</Paper>
	);
};

export default SeccionInferiorCarrito;
