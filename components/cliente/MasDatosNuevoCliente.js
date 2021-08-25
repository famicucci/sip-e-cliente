import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const inputObservaciones = {
	name: 'observaciones',
	label: 'Observaciones',
	placeholder: 'Observaciones',
	ancho: 6,
};

const inputMascota = {
	name: 'mascota',
	label: 'Mascota',
	placeholder: 'Mascota',
	ancho: 6,
};

// label, ancho, valores, descripcionValores
const selectTipo = {
	name: 'tipo',
	label: 'Tipo',
	ancho: 6,
	data: [
		{ id: 10, descripcion: 'Minorista' },
		{ id: 20, descripcion: 'Mayorista' },
	],
	valDefault: 10,
};

const selectCondIVA = {
	name: 'condIva',
	label: 'Condicion frente a IVA',
	ancho: 6,
	data: [
		{ id: 10, descripcion: 'Consumidor Final' },
		{ id: 20, descripcion: 'Monotributista' },
		{ id: 30, descripcion: 'Responsable Inscripto' },
	],
	valDefault: 10,
};

const MasDatosNuevoCliente = (props) => {
	const classes = useStyles();

	const onChangeSelect = (name, value) => {
		const arrayInputs = [{ ...selectTipo }, { ...selectCondIVA }];
		const data = arrayInputs.find((x) => x.name === name).data;
		const descripcion = data.find((x) => x.value === value).descripcion;

		props.onChangeAtributo(name, descripcion);
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Más Datos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					<InputBordeInferior
						label={inputObservaciones.label}
						name={inputObservaciones.name}
						placeholder={inputObservaciones.placeholder}
						ancho={inputObservaciones.ancho}
						required
						initialvalue=""
						funcModState={props.onChangeAtributo}
					/>
					<InputBordeInferior
						label={inputMascota.label}
						name={inputMascota.name}
						placeholder={inputMascota.placeholder}
						ancho={inputMascota.ancho}
						required
						initialvalue=""
						funcModState={props.onChangeAtributo}
					/>
					<SelectBordeInferior
						name={selectTipo.name}
						label={selectTipo.label}
						ancho={selectTipo.ancho}
						data={selectTipo.data}
						initialvalue={selectTipo.valDefault}
						funcModState={onChangeSelect}
					/>
					<SelectBordeInferior
						name={selectCondIVA.name}
						label={selectCondIVA.label}
						ancho={selectCondIVA.ancho}
						data={selectCondIVA.data}
						initialvalue={selectCondIVA.valDefault}
						funcModState={onChangeSelect}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default MasDatosNuevoCliente;
