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
		color: theme.palette.getContrastText(theme.palette.success.main),
		backgroundColor: theme.palette.success.main,
		'&:hover': {
			backgroundColor: theme.palette.success.dark,
		},
	},
}))(Button);

const BotonConfirmar = ({ contenido }) => {
	const classes = useStyles();

	return (
		<ColorButton variant="contained" className={classes.margin}>
			{contenido}
		</ColorButton>
	);
};

export default BotonConfirmar;
