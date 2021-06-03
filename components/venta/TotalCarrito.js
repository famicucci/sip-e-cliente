import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(0.5),
		padding: theme.spacing(1.5),
	},
	texto: {
		fontSize: '17px',
	},
}));

const TotalCarrito = () => {
	const classes = useStyles();

	return (
		<Box display="flex" p={1} bgcolor="background.paper">
			<Box flexGrow={1}>
				<Typography className={classes.texto} variant="overline">
					Total:
				</Typography>
			</Box>
			<Box>
				<Typography className={classes.texto} variant="overline">
					7550.00
				</Typography>
			</Box>
		</Box>
	);
};

export default TotalCarrito;
