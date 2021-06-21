import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
// import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			marginBottom: theme.spacing(1),
			width: '100%',
		},
	},
	divider: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
}));

// label, ancho, valores, descripcionValores
const selectDirecc = {
	name: 'direccion',
	label: 'Dirección',
	ancho: 12,
	data: [
		{ value: 10, descripcion: 'Nora Lange 962, VGB, Córdoba, Argentina' },
		{ value: 20, descripcion: 'Av. Julio a Roca 147, VGB, Córdoba, Argentina' },
	],
	valDefault: 10,
};

const selectTipo = {
	name: 'tipo',
	label: 'Tipo',
	ancho: 6,
	data: [
		{ value: 10, descripcion: 'Retiro' },
		{ value: 20, descripcion: 'Moto Nico' },
		{ value: 30, descripcion: 'Moto Guille' },
		{ value: 40, descripcion: 'OCA' },
		{ value: 50, descripcion: 'Correo Argentino' },
		{ value: 60, descripcion: 'PUDO' },
		{ value: 70, descripcion: 'MD' },
		{ value: 80, descripcion: 'Otro' },
	],
	valDefault: 10,
};

const inputCosto = {
	name: 'costo',
	label: 'Costo ($)',
	placeholder: 'Costo',
	ancho: 6,
	required: true,
};

const AgregarEnvioCarr = () => {
	const classes = useStyles();
	// const { handleEnvio } = useContext(VentasContext);

	const [envio, setEnvio] = useState({
		tipo: selectTipo.data[0].descripcion,
		direccion: selectDirecc.data[0].descripcion,
		costo: '',
	});

	const handleEnvio = (name, val) => {
		setEnvio({ ...envio, [name]: val });
	};

	// esto deberia estar dentro de un form
	// debe tener su propio state
	// cuando apreto aceptar se agrega al state venta

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<Typography variant="h5" align="center">
				Envío
			</Typography>
			<Divider className={classes.divider} variant="fullWidth" />
			<Grid container spacing={2}>
				<SelectBordeInferior
					name={selectDirecc.name}
					label={selectDirecc.label}
					ancho={selectDirecc.ancho}
					data={selectDirecc.data}
					valDefault={selectDirecc.valDefault}
					funcModState={handleEnvio}
				/>
				<SelectBordeInferior
					name={selectTipo.name}
					label={selectTipo.label}
					ancho={selectTipo.ancho}
					data={selectTipo.data}
					valDefault={selectTipo.valDefault}
					funcModState={handleEnvio}
				/>
				<InputNumberBordeInferior
					name={inputCosto.name}
					label={inputCosto.label}
					placeholder={inputCosto.placeholder}
					ancho={inputCosto.ancho}
					required={inputCosto.required}
					modState={handleEnvio}
				/>
			</Grid>
		</form>
	);
};

export default AgregarEnvioCarr;
