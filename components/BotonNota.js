import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';

const BotonNota = () => {
	return (
		<IconButton aria-label="Agregar Nota">
			<NoteOutlinedIcon />
		</IconButton>
	);
};

export default BotonNota;
