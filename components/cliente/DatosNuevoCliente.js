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
		name: 'nombre',
		label: 'Nombre',
		placeholder: 'Nombre',
		ancho: 6,
		required: true,
	},
	{
		name: 'apellido',
		label: 'Apellido',
		placeholder: 'Apellido',
		ancho: 6,
		required: true,
	},
	{
		name: 'razon-social',
		label: 'Razon Social',
		placeholder: 'Razon Social',
		ancho: 6,
	},
	{
		name: 'dni-cuit-cuil',
		label: 'DNI/CUIL/CUIT',
		placeholder: 'DNI/CUIL/CUIT',
		ancho: 6,
	},
];

const DatosNuevoCliente = () => {
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Datos</Typography>
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

export default DatosNuevoCliente;
