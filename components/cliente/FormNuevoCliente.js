import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatosNuevoCliente from './DatosNuevoCliente';
import ContactoNuevoCliente from './ContactoNuevoCliente';
import DomicilioNuevoCliente from './DomicilioNuevoCliente';
import MasDatosNuevoCliente from './MasDatosNuevoCliente';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import BotonSuccess from '../generales/botones/BotonSuccess';
import AlertaContext from '../../context/alertas/alertaContext';

const useStyles = makeStyles((theme) => ({
	divider: { marginTop: theme.spacing(2), marginBottom: theme.spacing(1) },
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
}));

const FormNuevoCliente = (props) => {
	const classes = useStyles();

	const initialState = {
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
		refDireccion: '',
		calle: '',
		numeroCalle: '',
		piso: '',
		depto: '',
		barrio: '',
		ciudad: '',
		provincia: '',
		observaciones: '',
		mascota: '',
		tipo: 'Mayorista',
		condIva: 'Consumidor Final',
	};

	const [cliente, setCliente] = useState(initialState);

	const { mostrarAlerta } = useContext(AlertaContext);

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

		// I send customer data and adress
		const client = {
			nombre: cliente.nombre,
			apellido: cliente.apellido,
			instagram: cliente.instagram,
			facebook: cliente.facebook,
			celular: cliente.celular,
			email: cliente.email,
			mascota: cliente.mascota,
			tipo: cliente.tipo,
			dni: cliente.dni,
			razonSocial: cliente.razonSocial,
			observaciones: cliente.observaciones,
			mascota: cliente.mascota,
			tipo: cliente.tipo,
			condIva: cliente.condIva,
		};

		let adress = {
			codPostal: cliente.codPostal,
			refDireccion: cliente.refDireccion,
			calle: cliente.calle,
			numeroCalle: cliente.numeroCalle,
			piso: cliente.piso,
			depto: cliente.depto,
			barrio: cliente.barrio,
			ciudad: cliente.ciudad,
			provincia: cliente.provincia,
		};

		let checkValuesAdress = Object.values(adress).every((x) => x === '');
		if (checkValuesAdress) {
			adress = null;
		} else if (
			!checkValuesAdress &&
			(adress.calle === '' || adress.numeroCalle === '' || adress.barrio === '')
		) {
			mostrarAlerta(
				'Si quieres agregar una dirección, debes completar al menos calle, numero y barrio',
				'error'
			);
			return;
		}

		props.crearCliente(client, adress);

		// props.handleClose();
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
			<Box className={classes.footer}>
				<BotonSuccess
					type="submit"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			</Box>
		</form>
	);
};

export default FormNuevoCliente;
