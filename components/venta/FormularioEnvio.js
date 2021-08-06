import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import AlertaContext from '../../context/alertas/alertaContext';
import { Direccion } from '../../functions/envio';
import useEnvio from '../../hooks/useEnvio';
import Alerta from '../Alerta';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& .MuiTextField-root': {
			marginBottom: theme.spacing(1),
			width: '100%',
		},
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
	valDefault: 10,
};

const inputDirecc = {
	name: 'direccion',
	label: 'Dirección',
	placeholder: 'Dirección',
	ancho: 11,
	valDefault: 10,
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

const FormularioEnvio = (props) => {
	const classes = useStyles();
	const { facturasOrden, envioInit, handleEnvio, tiposEnvio, cliente } = props;

	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	const [
		stateEnvio,
		handleSelectDireccion,
		handleInputDireccion,
		handleSelectTipo,
		handleInputCosto,
		handleSwitchDireccion,
	] = useEnvio(envioInit, cliente);

	const handleDisabledCostoEnvio = (facturasOrden) => {
		let estadoInput = false;
		if (facturasOrden) {
			if (facturasOrden.length > 0) {
				estadoInput = true;
			}
		}
		return estadoInput;
	};

	let valInitSelectDirection;
	if (!stateEnvio.select) {
		valInitSelectDirection = 'none';
	} else {
		valInitSelectDirection = stateEnvio.select.id;
	}

	const direccionClienteElegido = new Direccion(cliente.direcciones);

	const onSubmit = (e) => {
		e.preventDefault();

		// validar
		if (stateEnvio.tipo !== 1 && stateEnvio.costo === 0) {
			mostrarAlerta(
				'Aviso: debes enviar el/los productos pero no colocaste un costo de envío',
				'warning'
			);
		}

		if (stateEnvio.tipo !== 1 && !stateEnvio.select) {
			mostrarAlerta(
				'Aviso: debes enviar el/los productos pero no colocaste una dirección de envío',
				'warning'
			);
		}

		if (stateEnvio.tipo === 1 && stateEnvio.costo !== 0) {
			mostrarAlerta(
				'Aviso: El Retiro en local no debería tener un costo de envío',
				'warning'
			);
		}

		if (
			stateEnvio.modoDirecc === 'input' &&
			stateEnvio.tipo !== 1 &&
			stateEnvio.input.trim() === ''
		) {
			mostrarAlerta('Debes colocar una direccion de envío', 'warning');
			return;
		}

		if (stateEnvio.costo === '') {
			mostrarAlerta('Debes colocar un costo de envío', 'error');
			return;
		}

		// submit;
		handleEnvio(stateEnvio);

		// cierro el modal
		props.handleClose();
	};

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
			id="form-envio"
		>
			<Grid container spacing={2}>
				{stateEnvio.modoDirecc === 'select' ? (
					<SelectBordeInferior
						key={1}
						name={selectDirecc.name}
						label={selectDirecc.label}
						ancho={selectDirecc.ancho}
						data={direccionClienteElegido.creaDireccionesSelect()}
						valInit={valInitSelectDirection}
						funcModState={handleSelectDireccion}
						placeholder="Elegir dirección.."
					/>
				) : (
					<InputBordeInferior
						label={inputDirecc.label}
						name={inputDirecc.name}
						placeholder={inputDirecc.placeholder}
						ancho={inputDirecc.ancho}
						valInit={stateEnvio.input}
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
						<BotonFilaTabla
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
					valInit={stateEnvio.tipo}
					funcModState={handleSelectTipo}
				/>
				<InputNumberBordeInferior
					name={inputCosto.name}
					label={inputCosto.label}
					placeholder={inputCosto.placeholder}
					ancho={inputCosto.ancho}
					required={inputCosto.required}
					valInit={stateEnvio.costo}
					funcModState={handleInputCosto}
					disabled={handleDisabledCostoEnvio(facturasOrden)}
				/>
				{alerta !== null ? <Alerta /> : null}
			</Grid>
		</form>
	);
};

export default FormularioEnvio;
