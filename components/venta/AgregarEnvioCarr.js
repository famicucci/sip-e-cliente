import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';
import BotonSuccess from '../generales/botones/BontonSuccess';
import Alerta from '../Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import FormularioEnvio from './FormularioEnvio';
import useEnvio from '../../hooks/hookEnvio';

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

const cliente = {
	nombre: 'julieta',
	apellido: 'almis',
	direcciones: [
		{ id: 1, descripcion: 'Nora Lange 962, VGB, Córdoba, Argentina' },
		{ id: 2, descripcion: 'Av. Julio a Roca 147, VGB, Córdoba, Argentina' },
	],
};

const AgregarEnvioCarr = () => {
	const classes = useStyles();

	const { envio, handleEnvio } = useContext(VentasContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);
	const { handleClose } = useContext(BotoneraCarrContext);
	const [
		modoDirecc,
		valSelectDireccion,
		valInputDireccion,
		valSelectTipo,
		valInputCosto,
		setModoDirecc,
		handleSelectDireccion,
		handleInputDireccion,
		handleSelectTipo,
		handleInputCosto,
	] = useEnvio(envio);

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
			<FormularioEnvio
				modoDirecc={modoDirecc}
				cliente={cliente}
				valSelectDireccion={valSelectDireccion}
				handleSelectDireccion={handleSelectDireccion}
				valInputDireccion={valInputDireccion}
				handleInputDireccion={handleInputDireccion}
				valSelectTipo={valSelectTipo}
				handleSelectTipo={handleSelectTipo}
				valInputCosto={valInputCosto}
				handleInputCosto={handleInputCosto}
				setModoDirecc={setModoDirecc}
			/>
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
