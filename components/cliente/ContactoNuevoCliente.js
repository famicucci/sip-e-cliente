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
		name: 'email',
		label: 'Email',
		placeholder: 'Email',
		ancho: 6,
		required: true,
	},
	{
		name: 'celular',
		label: 'Celular',
		placeholder: 'Celular',
		ancho: 6,
	},
	{
		name: 'instagram',
		label: 'Instagram',
		placeholder: 'Instagram',
		ancho: 6,
	},
	{
		name: 'facebook',
		label: 'Facebook',
		placeholder: 'Facebook',
		ancho: 6,
	},
];

const ContactoNuevoCliente = () => {
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Contacto</Typography>
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

export default ContactoNuevoCliente;
