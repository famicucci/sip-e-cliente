import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CantEditableContext from '../../../context/celdasEditables/cantEditable/cantEditableContext';

const useStyles = makeStyles({
	IconoConfirmar: {
		color: '#8bc34a',
	},
});

const BotonConfirmarCancelar = () => {
	const classes = useStyles();

	const { idFilaActiva, modificarStock, handleFilaActiva } =
		useContext(CantEditableContext);

	return (
		<ButtonGroup variant="text" aria-label="text primary button group">
			<IconButton>
				<CheckIcon
					className={classes.IconoConfirmar}
					onClick={() => {
						modificarStock(ProductoCodigo, PtoStockId, cantidad);
					}}
				/>
			</IconButton>
			<IconButton
				onClick={() => {
					handleFilaActiva(null);
				}}
			>
				<CloseIcon color="error" />
			</IconButton>
		</ButtonGroup>
	);
};

export default BotonConfirmarCancelar;
