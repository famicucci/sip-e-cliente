import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
	IconoConfirmar: {
		color: '#8bc34a',
	},
});

const BotonConfirmarCancelar = () => {
	const classes = useStyles();

	return (
		<ButtonGroup variant="text" aria-label="text primary button group">
			<IconButton>
				<CheckIcon
					className={classes.IconoConfirmar}
					onClick={() => {
						confirmar(filaActiva.cantidad, nuevaCantidad);
					}}
				/>
			</IconButton>
			<IconButton
				onClick={() => {
					setFilaActiva({});
				}}
			>
				<CloseIcon color="error" />
			</IconButton>
		</ButtonGroup>
	);
};

export default BotonConfirmarCancelar;
