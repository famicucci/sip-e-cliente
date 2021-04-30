import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
	IconoConfirmar: {
		color: '#8bc34a',
	},
});

const BotonCantidadEditable = (props) => {
	const classes = useStyles();

	const { idFila, filaActiva, editar, setFilaActiva } = props;

	return (
		<>
			{editar(filaActiva, idFila) ? (
				// confirmar-cancelar
				<ButtonGroup variant="text" aria-label="text primary button group">
					<IconButton>
						<CheckIcon className={classes.IconoConfirmar} />
					</IconButton>
					<IconButton
						onClick={() => {
							setFilaActiva(null);
						}}
					>
						<CloseIcon color="error" />
					</IconButton>
				</ButtonGroup>
			) : (
				// editar
				<IconButton
					size="medium"
					edge="start"
					onClick={() => {
						setFilaActiva(idFila);
					}}
				>
					<EditIcon />
				</IconButton>
			)}
		</>
	);
};

export default BotonCantidadEditable;
