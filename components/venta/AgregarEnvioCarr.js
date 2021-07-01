import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Box } from '@material-ui/core';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import BotonSuccess from '../generales/botones/BontonSuccess';
import Alerta from '../Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			marginBottom: theme.spacing(1),
			width: '100%',
		},
	},
	divider: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
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
		{ value: 1, descripcion: 'Retiro' },
		{ value: 2, descripcion: 'OCA' },
		{ value: 3, descripcion: 'Correo Argentino' },
		{ value: 4, descripcion: 'PUDO' },
		{ value: 5, descripcion: 'MD' },
		{ value: 6, descripcion: 'Otro' },
	],
	valDefault: 1,
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

	const { envio, handleEnvio } = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);
	const { handleClose } = useContext(BotoneraCarrContext);

	const [valoresEnvio, setValoresEnvio] = useState({
		direccion: envio.direccion ? envio.direccion : selectDirecc.data[0].value,
		tipo: envio ? envio.tipo : selectTipo.data[0].value,
		costo: envio ? envio.costo : '',
	});

	const handleInput = (name, val) => {
		setValoresEnvio({ ...valoresEnvio, [name]: val });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validar
		if (valoresEnvio.tipo !== 1 && valoresEnvio.costo === 0) {
			mostrarAlerta(
				'Aviso: debes enviar el/los productos pero no colocaste un costo de envío',
				'warning'
			);
		}

		// obtener la descripcion de la direccion
		const direcc = selectDirecc.data.filter(
			(x) => x.value === valoresEnvio.direccion
		);
		const descripcionDirecc = direcc[0].descripcion;
		const envio = { ...valoresEnvio, direccion: descripcionDirecc };

		// submit
		handleEnvio(envio);

		// cierro el modal
		handleClose();
	};

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
		>
			<Typography variant="h5" align="center">
				Envío
			</Typography>
			<Divider className={classes.divider} variant="fullWidth" />
			<Grid container spacing={2}>
				<SelectBordeInferior
					key={1}
					name={selectDirecc.name}
					label={selectDirecc.label}
					ancho={selectDirecc.ancho}
					data={selectDirecc.data}
					valInit={valoresEnvio.direccion}
					funcModState={handleInput}
				/>
				<SelectBordeInferior
					key={2}
					name={selectTipo.name}
					label={selectTipo.label}
					ancho={selectTipo.ancho}
					data={selectTipo.data}
					valInit={valoresEnvio.tipo}
					funcModState={handleInput}
				/>
				<InputNumberBordeInferior
					name={inputCosto.name}
					label={inputCosto.label}
					placeholder={inputCosto.placeholder}
					ancho={inputCosto.ancho}
					required={inputCosto.required}
					valInit={valoresEnvio.costo}
					modState={handleInput}
				/>
			</Grid>
			<Divider className={classes.divider} variant="fullWidth" />
			<Box className={classes.footer}>
				<BotonSuccess
					type="submit"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			</Box>
			{alerta !== null ? <Alerta /> : null}
		</form>
	);
};

export default AgregarEnvioCarr;
