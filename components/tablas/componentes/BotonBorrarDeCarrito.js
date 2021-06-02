import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonEliminarDeCarrito = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<IconButton size="small">
				<ClearIcon fontSize="default" color="error" fontSize="small" />
			</IconButton>
		</div>
	);
};

export default BotonEliminarDeCarrito;
