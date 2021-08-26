import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import FormNuevoCliente from '../cliente/FormNuevoCliente';
import TablaClientes from '../cliente/TablaClientes';
import BuscadorPapper from '../generales/BuscadorPapper';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';
import VentasContext from '../../context/ventas/ventasContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';
import AddIcon from '@material-ui/icons/Add';
import ModalScroll from '../generales/ModalScroll';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		borderRadius: '10px',
	},
	appbar: { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' },
}));

const AgregarClienteCarr = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const { busquedaCliente, handleBusquedaCliente } = useContext(
		BarraHerramientasContext
	);
	const { handleCliente, crearYCargarCliente } = useContext(VentasContext);
	const { handleClose, openModalCliente } = useContext(BotoneraCarrContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const funcBoton = (x) => {
		handleCliente(x);
		handleClose();
	};

	// columnas de la tabla
	const columnas = [
		{ id: 1, nombre: 'Nombre y Apellido', align: 'left', minWidth: 290 },
		{ id: 2, nombre: 'Email', align: 'left', minWidth: 220 },
		{
			id: 10,
			nombre: 'Agregar',
			align: 'center',
			minWidth: 60,
			boton: true,
			contenidoBoton: <AddIcon />,
			funcBoton: funcBoton,
		},
	];

	return (
		<ModalScroll openModal={openModalCliente} handleClose={handleClose}>
			<div className={classes.root}>
				<AppBar position="static" className={classes.appbar}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="simple tabs example"
					>
						<Tab label="Nuevo" {...a11yProps(0)} />
						<Tab label="Existente" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<FormNuevoCliente
						handleClose={handleClose}
						crearCliente={crearYCargarCliente}
					/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<BuscadorPapper
						estilos={{ marginBottom: '8px' }}
						busqueda={busquedaCliente}
						handleBusqueda={handleBusquedaCliente}
					/>
					<TablaClientes columnas={columnas} busqueda={busquedaCliente} />
				</TabPanel>
			</div>
		</ModalScroll>
	);
};

export default AgregarClienteCarr;

// funciones para los tabs
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
