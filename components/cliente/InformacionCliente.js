import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VentasContext from '../../context/ventas/ventasContext';
import ClientesContext from '../../context/clientes/clientesContext';
import ModalScroll from '../generales/ModalScroll';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		borderRadius: '10px',
	},
	appbar: { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' },
}));

const InformacionCliente = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const { handleCliente } = useContext(VentasContext);
	const { openInfoCliente, handleClose } = useContext(ClientesContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// columnas de la tabla
	// const columnas = [
	// 	{ id: 1, nombre: 'Nombre y Apellido', align: 'left', minWidth: 290 },
	// 	{ id: 2, nombre: 'Email', align: 'left', minWidth: 220 },
	// 	{
	// 		id: 10,
	// 		nombre: 'Agregar',
	// 		align: 'center',
	// 		minWidth: 60,
	// 		boton: true,
	// 		contenidoBoton: <AddIcon />,
	// 		funcBoton: funcBoton,
	// 	},
	// ];

	return (
		<ModalScroll openModal={openInfoCliente} handleClose={handleClose}>
			<div className={classes.root}>
				<AppBar position="static" className={classes.appbar}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="simple tabs example"
					>
						<Tab label="Órdenes" {...a11yProps(0)} />
						<Tab label="Facturas" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<h4>Órdenes</h4>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<h4>Facturas</h4>
				</TabPanel>
			</div>
		</ModalScroll>
	);
};

export default InformacionCliente;

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
