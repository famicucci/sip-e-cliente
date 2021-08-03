import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';
import BotonSuccess from '../generales/botones/BotonSuccess';
import Alerta from '../Alerta';
import VentasContext from '../../context/ventas/ventasContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import FormularioEnvio from './FormularioEnvio';
import useEnvio from '../../hooks/useEnvio';

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

	// const { envio, cliente, handleEnvio } = useContext(VentasContext);

	// const { handleClose } = useContext(BotoneraCarrContext);

	return (
		<>
			<Typography variant="h5" align="center">
				Envío
			</Typography>
			<Divider className={classes.divider} variant="fullWidth" />
			<FormularioEnvio />
			<Divider className={classes.divider} variant="fullWidth" />
			<Box className={classes.footer}>
				<BotonSuccess
					type="submit"
					form="form-envio"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			</Box>
		</>
	);
};

export default AgregarEnvioCarr;
