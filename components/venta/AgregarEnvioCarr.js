import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BotonSuccess from '../generales/botones/BotonSuccess';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import FormularioEnvio from './FormularioEnvio';
import ModalCentrado from '../generales/ModalCentrado';
import VentasContext from '../../context/ventas/ventasContext';

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

	const { envio, tiposEnvio, cliente, handleEnvio } = useContext(VentasContext);

	useEffect(() => {
		const shippingInit = {
			modoDirecc: 'select',
			input: '',
			select: null,
			tipo: 1,
			costo: 0,
		};
		handleEnvio(shippingInit);
	}, []);

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
			<FormularioEnvio
				envioInit={envio}
				handleEnvio={handleEnvio}
				tiposEnvio={tiposEnvio}
				cliente={cliente}
				handleClose={handleClose}
			/>
		</ModalCentrado>
	);
};

export default AgregarEnvioCarr;
