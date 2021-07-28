import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatosNuevoCliente from './DatosNuevoCliente';
import ContactoNuevoCliente from './ContactoNuevoCliente';
import DomicilioNuevoCliente from './DomicilioNuevoCliente';
import MasDatosNuevoCliente from './MasDatosNuevoCliente';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ClientesContext from '../../context/clientes/clientesContext';
import BotonLimpiar from '../BotonLimpiar';
import BotonSuccess from '../generales/botones/BotonSuccess';
import AlertaContext from '../../context/alertas/alertaContext';

const useStyles = makeStyles((theme) => ({
	divider: { marginTop: theme.spacing(2), marginBottom: theme.spacing(1) },
}));

const FormNuevoCliente = (props) => {
	const classes = useStyles();

	const [cliente, setCliente] = useState({
		nombre: '',
		apellido: '',
		instagram: '',
		facebook: '',
		celular: '',
		email: '',
		mascota: '',
		tipo: '',
		dni: '',
		razonSocial: '',
		codPostal: '',
		referencia: '',
		calle: '',
		piso: '',
		numero: '',
		barrio: '',
		ciudad: '',
		provincia: '',
		observaciones: '',
		mascota: '',
		tipo: 'Mayorista',
		condIva: 'Consumidor Final',
	});

	const { mostrarAlerta } = useContext(AlertaContext);
	const { mensajeStateClientes, clienteActivo, crearCliente, limpiarCliente } =
		useContext(ClientesContext);

	useEffect(() => {
		if (mensajeStateClientes) {
			mostrarAlerta(mensajeStateClientes.msg, mensajeStateClientes.severity);
		}

		if (clienteActivo) {
			props.handleCliente(clienteActivo);
		}
	}, [mensajeStateClientes, clienteActivo]);

	const onChangeAtributo = (name, value) => {
		setCliente({ ...cliente, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// valida los campos -> los require deben estar llenos
		const { nombre, apellido, email, tipo, condIva } = cliente;
		if (nombre === '' || apellido === '') {
			mostrarAlerta('El nombre y el apellido son obligatorios', 'error');
			return;
		}

		if (email === '') {
			mostrarAlerta('La dirección de email es obligatoria', 'error');
			return;
		}

		if (tipo === '') {
			mostrarAlerta('El tipo de cliente es obligatorio', 'error');
			return;
		}

		if (condIva === '') {
			mostrarAlerta('La condición frente al IVA es obligatorio', 'error');
			return;
		}

		crearCliente(cliente);

		props.handleClose();
	};

	return (
		<form noValidate onSubmit={onSubmit}>
			<div className={classes.root}>
				<DatosNuevoCliente onChangeAtributo={onChangeAtributo} />
				<ContactoNuevoCliente onChangeAtributo={onChangeAtributo} />
				<DomicilioNuevoCliente onChangeAtributo={onChangeAtributo} />
				<MasDatosNuevoCliente onChangeAtributo={onChangeAtributo} />
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
					<BotonSuccess type="submit" contenido="Aceptar" />
				</Box>
			</Box>
		</form>
	);
};

export default FormNuevoCliente;
