import React from 'react';
import BrushIcon from '@material-ui/icons/Brush';
import IconButton from '@material-ui/core/IconButton';

const BotonLimpiar = ({ onClick }) => {
	return (
		<IconButton aria-label="Agregar Nota" onClick={onClick}>
			<BrushIcon color="error" />
		</IconButton>
	);
};

export default BotonLimpiar;
