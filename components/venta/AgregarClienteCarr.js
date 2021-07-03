import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormNuevoCliente from '../cliente/FormNuevoCliente';
import TablaClientes from '../cliente/TablaClientes';
import BuscadorPapper from '../generales/BuscadorPapper';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

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

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
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
				<FormNuevoCliente />
			</TabPanel>
			<TabPanel value={value} index={1}>
				{/* generalizar este buscador para  */}
				<BuscadorPapper
					estilos={{ marginBottom: '8px' }}
					busqueda={busquedaCliente}
					handleBusqueda={handleBusquedaCliente}
				/>
				<TablaClientes />
			</TabPanel>
		</div>
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
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
