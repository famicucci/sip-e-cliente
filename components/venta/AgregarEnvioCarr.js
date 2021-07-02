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
import BotonEditar from '../tablas/componentes/BotonFilaTabla';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';

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
	boton: {
		width: '100%',
		height: '100%',
	},
}));

// label, ancho, valores, descripcionValores
const selectDirecc = {
	name: 'direccion',
	label: 'Dirección',
	ancho: 11,
	// data: [
	// 	{ id: 1, descripcion: 'Nora Lange 962, VGB, Córdoba, Argentina' },
	// 	{ id: 2, descripcion: 'Av. Julio a Roca 147, VGB, Córdoba, Argentina' }, // esto va a estar en el state
	// ],
	valDefault: 10,
};

const cliente = {
	nombre: 'julieta',
	apellido: 'almis',
	direcciones: [
		{ id: 1, descripcion: 'Nora Lange 962, VGB, Córdoba, Argentina' },
		{ id: 2, descripcion: 'Av. Julio a Roca 147, VGB, Córdoba, Argentina' },
	],
};

const selectTipo = {
	name: 'tipo',
	label: 'Tipo',
	ancho: 6,
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

	const { envio, handleEnvio, tiposEnvio } = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);
	const { handleClose } = useContext(BotoneraCarrContext);

	const [modoDirecc, setModoDirecc] = useState(envio.modoDirecc);

	let initSelectDireccion;
	if (!envio.select.id) {
		initSelectDireccion = cliente.direcciones[0].id;
	} else if (envio.select.id) {
		initSelectDireccion = envio.select.id;
	}
	const [valSelectDireccion, setValSelectDireccion] =
		useState(initSelectDireccion);
	const [valInputDireccion, setValInputDireccion] = useState(envio.input);
	const [valSelectTipo, setValSelectTipo] = useState(envio.tipo);
	const [valInputCosto, setValInputCosto] = useState(envio.costo);

	const handleSelectDireccion = (name, val) => {
		setValSelectDireccion(val);
	};

	const handleInputDireccion = (name, val) => {
		setValInputDireccion(val);
	};

	const handleSwitchDireccion = () => {
		if (modoDirecc === 'select') {
			setModoDirecc('input');
		} else if (modoDirecc === 'input') {
			setModoDirecc('select');
		}
	};

	const handleSelectTipo = (name, val) => {
		setValSelectTipo(val);
	};

	const handleInputCosto = (name, val) => {
		setValInputCosto(val);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validar
		if (valSelectTipo !== 1 && valInputCosto === 0) {
			mostrarAlerta(
				'Aviso: debes enviar el/los productos pero no colocaste un costo de envío',
				'warning'
			);
		}

		if (
			modoDirecc === 'input' &&
			valSelectTipo !== 1 &&
			valInputDireccion.trim() === ''
		) {
			mostrarAlerta('Debes colocar una direccion de envío', 'warning');
			return;
		}

		let envioMod;
		if (modoDirecc === 'select') {
			const r = cliente.direcciones.find((x) => x.id === valSelectDireccion);
			envioMod = { ...envio, select: r };
		} else if (modoDirecc === 'input') {
			envioMod = { ...envio, input: valInputDireccion };
		}

		envioMod = {
			...envioMod,
			tipo: valSelectTipo,
			costo: valInputCosto,
			modoDirecc: modoDirecc,
		};

		// submit;
		handleEnvio(envioMod);

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
				{modoDirecc === 'select' ? (
					<SelectBordeInferior
						key={1}
						name={selectDirecc.name}
						label={selectDirecc.label}
						ancho={selectDirecc.ancho}
						data={cliente.direcciones}
						valInit={valSelectDireccion}
						funcModState={handleSelectDireccion}
					/>
				) : (
					<InputBordeInferior
						label="Dirección"
						name="direccion"
						placeholder="Dirección"
						ancho={11}
						valInit={valInputDireccion}
						funcModState={handleInputDireccion}
					/>
				)}

				<Grid item xs={1}>
					<Box
						className={classes.boton}
						display="flex"
						justifyContent="center"
						alignItems="flex-end"
					>
						<BotonEditar
							contenido={<FlipCameraAndroidIcon />}
							onClick={() => {
								handleSwitchDireccion();
							}}
						/>
					</Box>
				</Grid>

				<SelectBordeInferior
					key={2}
					name={selectTipo.name}
					label={selectTipo.label}
					ancho={selectTipo.ancho}
					data={tiposEnvio}
					valInit={valSelectTipo}
					funcModState={handleSelectTipo}
				/>
				<InputNumberBordeInferior
					name={inputCosto.name}
					label={inputCosto.label}
					placeholder={inputCosto.placeholder}
					ancho={inputCosto.ancho}
					required={inputCosto.required}
					valInit={valInputCosto}
					funcModState={handleInputCosto}
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
