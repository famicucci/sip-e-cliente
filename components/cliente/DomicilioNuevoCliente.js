import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const inputCalle = {
	name: 'calle',
	label: 'Calle',
	placeholder: 'Calle',
	ancho: 6,
	required: false,
};
const inputNumero = {
	name: 'numero',
	label: 'Numero',
	placeholder: 'Numero',
	ancho: 2,
	required: false,
};
const inputPiso = {
	name: 'piso',
	label: 'Piso',
	placeholder: 'Piso',
	ancho: 2,
	required: false,
};
const inputDepto = {
	name: 'depto',
	label: 'Depto.',
	placeholder: 'Depto.',
	ancho: 2,
	required: false,
};
const inputBarrio = {
	name: 'barrio',
	label: 'Barrio',
	placeholder: 'Barrio',
	ancho: 4,
	required: false,
};
const inputCodPostal = {
	name: 'codPostal',
	label: 'C.P.',
	placeholder: 'C.P.',
	ancho: 2,
	required: false,
};
const inputCiudad = {
	name: 'ciudad',
	label: 'Ciudad',
	placeholder: 'Ciudad',
	ancho: 6,
	required: false,
};
const inputProvincia = {
	name: 'provincia',
	label: 'Provincia',
	placeholder: 'Provincia',
	ancho: 6,
	required: false,
};
const inputReferencia = {
	name: 'referencia',
	label: 'Referencia',
	placeholder: 'Referencia',
	ancho: 6,
	required: false,
};

const DomicilioNuevoCliente = (props) => {
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
					<InputBordeInferior
						label={inputCalle.label}
						name={inputCalle.name}
						placeholder={inputCalle.placeholder}
						ancho={inputCalle.ancho}
						required={inputCalle.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
					/>
					<InputNumberBordeInferior
						label={inputNumero.label}
						name={inputNumero.name}
						placeholder={inputNumero.placeholder}
						ancho={inputNumero.ancho}
						required={inputNumero.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
						styles={{ marginTop: 2 }}
					/>
					<InputBordeInferior
						label={inputPiso.label}
						name={inputPiso.name}
						placeholder={inputPiso.placeholder}
						ancho={inputPiso.ancho}
						required={inputPiso.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputDepto.label}
						name={inputDepto.name}
						placeholder={inputDepto.placeholder}
						ancho={inputDepto.ancho}
						required={inputDepto.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputBarrio.label}
						name={inputBarrio.name}
						placeholder={inputBarrio.placeholder}
						ancho={inputBarrio.ancho}
						required={inputBarrio.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
					/>
					<InputNumberBordeInferior
						label={inputCodPostal.label}
						name={inputCodPostal.name}
						placeholder={inputCodPostal.placeholder}
						ancho={inputCodPostal.ancho}
						required={inputCodPostal.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
						styles={{ marginTop: 2 }}
					/>
					<InputBordeInferior
						label={inputCiudad.label}
						name={inputCiudad.name}
						placeholder={inputCiudad.placeholder}
						ancho={inputCiudad.ancho}
						required={inputCiudad.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputProvincia.label}
						name={inputProvincia.name}
						placeholder={inputProvincia.placeholder}
						ancho={inputProvincia.ancho}
						required={inputProvincia.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputReferencia.label}
						name={inputReferencia.name}
						placeholder={inputReferencia.placeholder}
						ancho={inputReferencia.ancho}
						required={inputReferencia.required}
						initialvalue=""
						tochangestate={props.onChangeAtributo}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default DomicilioNuevoCliente;
