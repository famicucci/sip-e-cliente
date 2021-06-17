import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputNuevoCliente from './InputNuevoCliente';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const inputs = [
	{
		name: 'calle',
		label: 'Calle',
		placeholder: 'Calle',
		ancho: 6,
	},
	{
		name: 'numero',
		label: 'Numero',
		placeholder: 'Numero',
		ancho: 2,
	},
	{
		name: 'piso',
		label: 'Piso',
		placeholder: 'Piso',
		ancho: 2,
	},
	{
		name: 'depto',
		label: 'Depto.',
		placeholder: 'Depto.',
		ancho: 2,
	},
	{
		name: 'barrio',
		label: 'Barrio',
		placeholder: 'Barrio',
		ancho: 4,
	},
	{
		name: 'codPostal',
		label: 'C.P.',
		placeholder: 'C.P.',
		ancho: 2,
	},
	{
		name: 'ciudad',
		label: 'Ciudad',
		placeholder: 'Ciudad',
		ancho: 6,
	},
	{
		name: 'provincia',
		label: 'Provincia',
		placeholder: 'Provincia',
		ancho: 6,
	},
	{
		name: 'referencia',
		label: 'Referencia',
		placeholder: 'Referencia',
		ancho: 6,
	},
];

const DomicilioNuevoCliente = () => {
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Domicilio</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					{inputs.map((x) => (
						<InputNuevoCliente
							name={x.name}
							label={x.label}
							placeholder={x.placeholder}
							ancho={x.ancho}
							required={x.required}
						/>
					))}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default DomicilioNuevoCliente;
