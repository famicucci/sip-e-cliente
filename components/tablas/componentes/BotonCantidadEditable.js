import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { CantidadEditableContext } from '../../../context/CantidadEditableContext';

const useStyles = makeStyles({
	IconoConfirmar: {
		color: '#8bc34a',
	},
});

const BotonCantidadEditable = (props) => {
	const classes = useStyles();

	const { fila } = props;

	const { filaActiva, nuevaCantidad, setFilaActiva, editar, confirmar } =
		useContext(CantidadEditableContext);

	return (
		<>
			{!editar(filaActiva.id, fila.id) ? (
				// editar
				<IconButton
					size="small"
					edge="start"
					onClick={() => {
						setFilaActiva(fila);
					}}
				>
					<EditIcon />
				</IconButton>
			) : (
				// confirmar-cancelar
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
			)}
		</>
	);
};

export default BotonCantidadEditable;
