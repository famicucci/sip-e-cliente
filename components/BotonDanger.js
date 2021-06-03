import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import BrushIcon from '@material-ui/icons/Brush';
import IconButton from '@material-ui/core/IconButton';

const BotonDanger = () => {
	return (
		<IconButton aria-label="Agregar Nota">
			<BrushIcon color="error" />
		</IconButton>
	);
};

export default BotonDanger;
