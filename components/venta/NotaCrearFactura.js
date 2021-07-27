import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import useEnvio from '../../hooks/hookEnvio';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Envio } from '../../functions/envio';
import { Grid, Box } from '@material-ui/core';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
	texto: {
		fontSize: '17px',
	},
	box: {
		width: '100%',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(5),
	},
}));

const NotaCrearFactura = (props) => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState({ expanded: false });
	const [nota, setNota] = useState('');

	// const { handleFactura } = useContext(EditarOrdenesContext);

	// useEffect(() => {
	// 	const objFactura = { observaciones: nota };
	// 	handleFactura(objFactura);
	// }, [nota]);

	useEffect(() => {
		props.funcModState(nota);
	}, [nota]);

	const onChangeNota = (name, value) => {
		setNota(value);
	};

	const onClickSummary = () => {
		if (expanded.expanded === true) {
			setExpanded({ expanded: false });
		} else if (expanded.expanded === false) {
			setExpanded({ expanded: true });
		}
	};

	return (
		<Accordion {...expanded}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				onClick={onClickSummary}
			>
				<Typography className={classes.heading}>Nota</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<InputBordeInferior
					// label="Nota"
					name="nota"
					placeholder="Escribe la nota aquí..."
					ancho={12}
					required={true}
					valInit={''}
					funcModState={onChangeNota}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

export default NotaCrearFactura;
