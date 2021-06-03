import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

const ColorButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(theme.palette.accion.main),
		backgroundColor: theme.palette.accion.main,
		'&:hover': {
			backgroundColor: theme.palette.accion.dark,
		},
	},
}))(Button);

const BotonAccion = () => {
	const classes = useStyles();

	return (
		<ColorButton variant="contained" className={classes.margin}>
			Envío
		</ColorButton>
	);
};

export default BotonAccion;
