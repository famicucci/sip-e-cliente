import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputNuevoCliente from './InputNuevoCliente';
import Grid from '@material-ui/core/Grid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const inputNombre = {
	name: 'nombre',
	label: 'Nombre',
	placeholder: 'Nombre',
	ancho: 6,
	required: true,
};

const inputApellido = {
	name: 'apellido',
	label: 'Apellido',
	placeholder: 'Apellido',
	ancho: 6,
	required: true,
};

const inputRazonSocial = {
	name: 'razonSocial',
	label: 'Razon Social',
	placeholder: 'Razon Social',
	ancho: 6,
};

const inputDniCuitCuil = {
	name: 'dniCuitCuil',
	label: 'DNI/CUIL/CUIT',
	placeholder: 'DNI/CUIL/CUIT',
	ancho: 6,
};

const DatosNuevoCliente = (props) => {
	const classes = useStyles();

	return (
		<Accordion defaultExpanded="true">
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Datos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					<InputBordeInferior
						label={inputNombre.label}
						name={inputNombre.name}
						placeholder={inputNombre.placeholder}
						ancho={inputNombre.ancho}
						required
						valInit=""
						funcModState={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputApellido.label}
						name={inputApellido.name}
						placeholder={inputApellido.placeholder}
						ancho={inputApellido.ancho}
						required
						valInit=""
						funcModState={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputRazonSocial.label}
						name={inputRazonSocial.name}
						placeholder={inputRazonSocial.placeholder}
						ancho={inputRazonSocial.ancho}
						required
						valInit=""
						funcModState={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputDniCuitCuil.label}
						name={inputDniCuitCuil.name}
						placeholder={inputDniCuitCuil.placeholder}
						ancho={inputDniCuitCuil.ancho}
						required
						valInit=""
						funcModState={props.onChangeAtributo}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default DatosNuevoCliente;
