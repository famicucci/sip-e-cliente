import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatosNuevoCliente from './DatosNuevoCliente';
import ContactoNuevoCliente from './ContactoNuevoCliente';
import DomicilioNuevoCliente from './DomicilioNuevoCliente';
import MasDatosNuevoCliente from './MasDatosNuevoCliente';
import BotonConfimarAccion from '../BotonConfirmarAccion';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ClientesContext from '../../context/clientes/clientesContext';
import BotonLimpiar from '../BotonLimpiar';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	divider: { marginTop: theme.spacing(2), marginBottom: theme.spacing(1) },
}));

const NuevoCliente = () => {
	const classes = useStyles();

	const { limpiarCliente } = useContext(ClientesContext);

	const onSubmit = (e) => {
		e.preventDefault();
		// valida los campos -> los require deben estar llenos
		// cuando hace el submit inserta el cliente en la base de datos
	};

	return (
		<form className={classes.form} noValidate onSubmit={onSubmit}>
			<div className={classes.root}>
				<DatosNuevoCliente />
				<ContactoNuevoCliente />
				<DomicilioNuevoCliente />
				<MasDatosNuevoCliente />
			</div>
			<Divider className={classes.divider} variant="middle" />
			<Box display="flex">
				<Box flexGrow={1}>
					<BotonLimpiar
						onClick={() => {
							limpiarCliente();
						}}
					/>
				</Box>
				<Box>
					<BotonConfimarAccion type="submit" contenido="Aceptar" />
				</Box>
			</Box>
		</form>
	);
};

export default NuevoCliente;
