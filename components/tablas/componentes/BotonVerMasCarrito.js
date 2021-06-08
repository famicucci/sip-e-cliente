import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { IconButton } from '@material-ui/core';
import VentasContext from '../../../context/ventas/ventasContext';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonVerMasCarrito = ({ codigoProducto, setOpen, open }) => {
	const classes = useStyles();
	const { handleProductoActivoCarrito } = useContext(VentasContext);

	return (
		<div className={classes.root}>
			<IconButton
				size="small"
				onClick={() => {
					setOpen(!open);
					// handleProductoActivoCarrito(codigoProducto);
				}}
			>
				{!open ? (
					<ArrowDropDownIcon fontSize="default" fontSize="small" />
				) : (
					<ArrowDropUpIcon fontSize="default" fontSize="small" />
				)}
			</IconButton>
		</div>
	);
};

export default BotonVerMasCarrito;
