import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import ItemInfoConLabel from '../generales/ItemInfoConLabel';
import DireccionesCliente from './DireccionesCliente';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	cajaPadre: { width: 600 },
	caja: {
		Width: '100%',
	},
	label: {
		marginBottom: theme.spacing(0),
		marginTop: theme.spacing(0),
		fontSize: theme.typography.pxToRem(12),
	},
	texto: { marginTop: theme.spacing(0), marginBottom: theme.spacing(1) },
}));

const DomicilioCliente = ({ cliente }) => {
	const classes = useStyles();

	const items = [
		{ id: 1, label: 'Email', contenido: cliente.email, ancho: 6 },
		{ id: 2, label: 'Celular', contenido: cliente.celular, ancho: 6 },
		{ id: 3, label: 'Instagram', contenido: cliente.instagram, ancho: 6 },
		{ id: 4, label: 'Facebook', contenido: cliente.facebook, ancho: 6 },
	];

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Domicilio</Typography>
			</AccordionSummary>
			<AccordionDetails className={classes.cajaPadre}>
				<Grid container spacing={2}>
					<Grid item>
						<Box className={classes.caja}>
							<p className={classes.label}>Direcciones</p>
							<DireccionesCliente direcciones={cliente.direcciones} />
						</Box>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default DomicilioCliente;
