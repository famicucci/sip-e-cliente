import React, { useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import StockContext from '../../../context/stock/stockContext';

const BotonEditar = ({ fila }) => {
	const { handleFilaActiva } = useContext(StockContext);

	return (
		<IconButton
			size="small"
			edge="start"
			onClick={() => {
				handleFilaActiva(fila);
			}}
		>
			<EditIcon />
		</IconButton>
	);
};

export default BotonEditar;
