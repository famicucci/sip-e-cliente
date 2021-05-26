import React, { useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CantEditableContext from '../../../context/celdasEditables/cantEditable/cantEditableContext';

const BotonEditar = ({ id }) => {
	const { handleFilaActiva } = useContext(CantEditableContext);

	return (
		<IconButton
			size="small"
			edge="start"
			onClick={() => {
				handleFilaActiva(id);
			}}
		>
			<EditIcon />
		</IconButton>
	);
};

export default BotonEditar;
