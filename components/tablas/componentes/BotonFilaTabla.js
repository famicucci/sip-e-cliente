import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const BotonEditar = ({ contenido, onClick }) => {
	return (
		<IconButton size="small" edge="start" onClick={onClick}>
			{contenido}
		</IconButton>
	);
};

export default BotonEditar;
