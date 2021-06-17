import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

const ColorButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(theme.palette.success.main),
		backgroundColor: theme.palette.success.main,
		'&:hover': {
			backgroundColor: theme.palette.success.dark,
		},
	},
}))(Button);

const BotonConfirmarAccion = (props) => {
	const classes = useStyles();

	return (
		<ColorButton
			variant="contained"
			className={classes.margin}
			onClick={props.onClick}
		>
			{props.contenido}
		</ColorButton>
	);
};

export default BotonConfirmarAccion;
