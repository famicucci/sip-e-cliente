import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	nombre: {
		marginLeft: theme.spacing(2),
	},
}));

const ClienteCarr = () => {
	const classes = useStyles();

	return (
		<Box display="flex" p={1} bgcolor="background.paper">
			<Typography variant="body2">Cliente:</Typography>
			<Typography className={classes.nombre} variant="body2">
				Francisco Micucci
			</Typography>
		</Box>
	);
};

export default ClienteCarr;
