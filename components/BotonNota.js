import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import NoteIcon from '@material-ui/icons/Note';
import { BotoneraCarrContext } from '../context/BotoneraCarrContext';

const BotonNota = () => {
	const { openNota, handleNota } = useContext(BotoneraCarrContext);

	// el icono debe quedar lleno cuando hay una nota escrita
	return (
		<IconButton
			aria-label="Agregar Nota"
			onClick={() => {
				handleNota();
			}}
		>
			{!openNota ? <NoteOutlinedIcon /> : <NoteIcon />}
		</IconButton>
	);
};

export default BotonNota;
