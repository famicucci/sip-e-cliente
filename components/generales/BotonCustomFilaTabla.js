import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { pink, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: (props) =>
			props.children === 'Crear Factura' ? pink[500] : deepPurple[500],
		'&:hover': {
			backgroundColor: (props) =>
				props.children === 'Crear Factura' ? pink[700] : deepPurple[700],
		},
		borderRadius: '5px',
		fontSize: theme.typography.pxToRem(11),
	},
}));

const BotonCustonFilaTabla = (props) => {
	const classes = useStyles(props);

	const handleClickBoton = (event) => {
		console.log('hol');
		// setAnchorEl(event.currentTarget);
	};

	return (
		<Button
			className={classes.root}
			variant="contained"
			color="primary"
			disableRipple
			onClick={handleClickBoton}
		>
			{props.children}
		</Button>
	);
};

export default BotonCustonFilaTabla;
