import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import StockContext from '../../../context/stock/stockContext';

const BotonEditar = ({ contenido, onClick }) => {
	return (
		<IconButton size="small" edge="start" onClick={onClick}>
			{contenido}
		</IconButton>
	);
};

export default BotonEditar;
