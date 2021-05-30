import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const BotonAgregarCarrito = () => {
	return (
		<IconButton color="secondary" aria-label="add to shopping cart">
			<AddShoppingCartIcon />
		</IconButton>
	);
};

export default BotonAgregarCarrito;
