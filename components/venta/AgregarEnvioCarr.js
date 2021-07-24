import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';
import BotonSuccess from '../generales/botones/BotonSuccess';
import Alerta from '../Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import FormularioEnvio from './FormularioEnvio';
import useEnvio from '../../hooks/hookEnvio';

const useStyles = makeStyles((theme) => ({
	divider: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
}));

const AgregarEnvioCarr = () => {
	const classes = useStyles();

	const { envio, cliente, handleEnvio } = useContext(VentasContext);

	const envioObj = {
		valSelectDirecc: envio.select.id,
		modoDirecc: envio.modoDirecc,
		valInputDirecc: envio.input,
		valSelectTipo: envio.tipo,
		valInputCosto: envio.costo,
	};

	const { alerta, mostrarAlerta } = useContext(AlertaContext);
	const { handleClose } = useContext(BotoneraCarrContext);
	const [
		stateEnvio,
		handleSelectDireccion,
		handleInputDireccion,
		handleSelectTipo,
		handleInputCosto,
		handleSwitchDireccion,
	] = useEnvio(envioObj, cliente.direcciones);

	const onSubmit = (e) => {
		e.preventDefault();

		// validar
		if (stateEnvio.valSelectTipo !== 1 && stateEnvio.valInputCosto === 0) {
			mostrarAlerta(
				'Aviso: debes enviar el/los productos pero no colocaste un costo de envío',
				'warning'
			);
		}

		if (
			stateEnvio.modoDirecc === 'input' &&
			stateEnvio.valSelectTipo !== 1 &&
			stateEnvio.valInputDireccion.trim() === ''
		) {
			mostrarAlerta('Debes colocar una direccion de envío', 'warning');
			return;
		}

		let envioMod;
		if (stateEnvio.modoDirecc === 'select') {
			const r = cliente.direcciones.find(
				(x) => x.id === stateEnvio.valSelectDireccion
			);
			envioMod = { ...envio, select: r };
		} else if (stateEnvio.modoDirecc === 'input') {
			envioMod = { ...envio, input: stateEnvio.valInputDireccion };
		}

		envioMod = {
			...envioMod,
			tipo: stateEnvio.valSelectTipo,
			costo: stateEnvio.valInputCosto,
			modoDirecc: stateEnvio.modoDirecc,
		};

		// submit;
		handleEnvio(envioMod);

		// cierro el modal
		handleClose();
	};

	return (
		<>
			<Typography variant="h5" align="center">
				Envío
			</Typography>
			<Divider className={classes.divider} variant="fullWidth" />
			<FormularioEnvio
				stateEnvio={stateEnvio}
				handleSelectDireccion={handleSelectDireccion}
				handleInputDireccion={handleInputDireccion}
				handleSelectTipo={handleSelectTipo}
				handleInputCosto={handleInputCosto}
				handleSwitchDireccion={handleSwitchDireccion}
				onSubmit={onSubmit}
			/>
			<Divider className={classes.divider} variant="fullWidth" />
			<Box className={classes.footer}>
				<BotonSuccess
					type="submit"
					form="form-envio"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			</Box>
			{alerta !== null ? <Alerta /> : null}
		</>
	);
};

export default AgregarEnvioCarr;
