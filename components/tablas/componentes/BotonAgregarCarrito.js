import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { IconButton } from '@material-ui/core';
import VentasContext from '../../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonAgregarCarrito = (props) => {
	const classes = useStyles();

	const { handleCarrito } = useContext(VentasContext);

	return (
		<div className={classes.root}>
			<Badge
				color="default"
				badgeContent={props.product.cantidad}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				showZero
			>
				<IconButton
					size="small"
					color="secondary"
					onClick={() => handleCarrito(props.product)}
				>
					<AddShoppingCartIcon fontSize="default" />
				</IconButton>
			</Badge>
		</div>
	);
};

export default BotonAgregarCarrito;
