import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatosNuevoCliente from './DatosNuevoCliente';
import ContactoNuevoCliente from './ContactoNuevoCliente';
import DomicilioNuevoCliente from './DomicilioNuevoCliente';
import MasDatosNuevoCliente from './MasDatosNuevoCliente';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
}));

const NuevoCliente = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<DatosNuevoCliente />
			<ContactoNuevoCliente />
			<DomicilioNuevoCliente />
			<MasDatosNuevoCliente />
		</div>
	);
};

export default NuevoCliente;
