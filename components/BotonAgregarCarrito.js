import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonAgregarCarrito = ({ cantidad }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Badge
				color="default"
				badgeContent={cantidad}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				showZero
			>
				<IconButton size="small" color="secondary">
					<AddShoppingCartIcon />
				</IconButton>
			</Badge>
		</div>
	);
};

export default BotonAgregarCarrito;
