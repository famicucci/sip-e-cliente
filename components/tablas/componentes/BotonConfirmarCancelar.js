import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StockContext from '../../../context/stock/stockContext';

const useStyles = makeStyles({
	IconoConfirmar: {
		color: '#8bc34a',
	},
});

const BotonConfirmarCancelar = ({ confirmar }) => {
	const classes = useStyles();

	const { filaActivaProducto, handleFilaActiva } = useContext(StockContext);

	return (
		<ButtonGroup variant="text" aria-label="text primary button group">
			<IconButton
				onClick={() => {
					confirmar(filaActivaProducto);
				}}
			>
				<CheckIcon className={classes.IconoConfirmar} />
			</IconButton>
			<IconButton
				onClick={() => {
					handleFilaActiva({});
				}}
			>
				<CloseIcon color="error" />
			</IconButton>
		</ButtonGroup>
	);
};

export default BotonConfirmarCancelar;
