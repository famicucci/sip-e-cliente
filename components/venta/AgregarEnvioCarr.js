import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BotonSuccess from '../generales/botones/BotonSuccess';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import FormularioEnvio from './FormularioEnvio';
import ModalCentrado from '../generales/ModalCentrado';

const useStyles = makeStyles(() => ({
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
}));

const AgregarEnvioCarr = () => {
	const classes = useStyles();

	const { openModalAgregarEnvioCarrito, handleClose } =
		useContext(BotoneraCarrContext);

	return (
		<ModalCentrado
			titulo="Envío"
			padding={16}
			openModal={openModalAgregarEnvioCarrito}
			handleClose={handleClose}
			footer={
				<BotonSuccess
					type="submit"
					form="form-envio"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			}
		>
			<FormularioEnvio />
		</ModalCentrado>
	);
};

export default AgregarEnvioCarr;
