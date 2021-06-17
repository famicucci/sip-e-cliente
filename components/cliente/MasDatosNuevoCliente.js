import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputNuevoCliente from './InputNuevoCliente';
import Grid from '@material-ui/core/Grid';
import SelectNuevoCliente from './selectNuevoCliente';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const inputs = [
	{
		name: 'observaciones',
		label: 'Observaciones',
		placeholder: 'Observaciones',
		ancho: 6,
	},
	{
		name: 'mascota',
		label: 'Mascota',
		placeholder: 'Mascota',
		ancho: 6,
	},
];

// label, ancho, valores, descripcionValores
const selectTipo = {
	name: 'tipo',
	label: 'Tipo',
	ancho: 6,
	data: [
		{ value: 10, descripcion: 'Minorista' },
		{ value: 20, descripcion: 'Mayorista' },
	],
	valDefault: 10,
};

const selectCondIVA = {
	name: 'condIva',
	label: 'Condicion frente a IVA',
	ancho: 6,
	data: [
		{ value: 10, descripcion: 'Consumidor Final' },
		{ value: 20, descripcion: 'Monotributista' },
		{ value: 30, descripcion: 'Responsable Inscripto' },
	],
	valDefault: 10,
};

const MasDatosNuevoCliente = () => {
	const classes = useStyles();

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
					{inputs.map((x) => (
						<InputNuevoCliente
							name={x.name}
							label={x.label}
							placeholder={x.placeholder}
							ancho={x.ancho}
							required={x.required}
						/>
					))}
					<SelectNuevoCliente
						name={selectTipo.name}
						label={selectTipo.label}
						ancho={selectTipo.ancho}
						data={selectTipo.data}
						valDefault={selectTipo.valDefault}
					/>
					<SelectNuevoCliente
						name={selectCondIVA.name}
						label={selectCondIVA.label}
						ancho={selectCondIVA.ancho}
						data={selectCondIVA.data}
						valDefault={selectCondIVA.valDefault}
					/>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default MasDatosNuevoCliente;
