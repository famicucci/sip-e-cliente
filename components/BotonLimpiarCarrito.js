import React, { useContext } from 'react';
import BrushIcon from '@material-ui/icons/Brush';
import IconButton from '@material-ui/core/IconButton';
import VentasContext from '../context/ventas/ventasContext';

const BotonLimpiarCarrito = () => {
	const { limpiarCarrito } = useContext(VentasContext);

	const onClick = () => {
		limpiarCarrito();
	};

	return (
		<IconButton aria-label="Agregar Nota" onClick={onClick}>
			<BrushIcon color="error" />
		</IconButton>
	);
};

export default BotonLimpiarCarrito;
