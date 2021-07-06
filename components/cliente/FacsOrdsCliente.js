import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ClientesContext from '../../context/clientes/clientesContext';
import ModalScroll from '../generales/ModalScroll';
import TablaMostrarOrdenes from '../venta/TablaMostrarOrdenes';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		borderRadius: '10px',
	},
	appbar: { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' },
}));

const FacsOrdsCliente = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const { openInfoCliente, handleClose, ordenesClienteActivo, cargando } =
		useContext(ClientesContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// columnas de la tabla
	const columnasOrds = [
		{ id: 1, nombre: 'Nº', align: 'center', minWidth: 60 },
		{ id: 1, nombre: 'Ord. Ecommerce', align: 'left', minWidth: 110 },
		{ id: 1, nombre: 'Creación', align: 'center', minWidth: 110 },
		{ id: 1, nombre: 'Pto. Venta', align: 'left', minWidth: 110 },
		{ id: 1, nombre: 'Estado', align: 'left', minWidth: 130 },
		{ id: 1, nombre: 'Tipo Envio', align: 'center', minWidth: 110 },
		{
			id: 2,
			nombre: 'Observaciones',
			align: 'center',
			minWidth: 60,
			boton: true,
			contenidoBoton: <NoteOutlinedIcon />,
		},
		{
			id: 2,
			nombre: 'Ver Detalle',
			align: 'center',
			minWidth: 60,
			boton: true,
			contenidoBoton: <CallMadeOutlinedIcon />,
			funcBoton: null,
		},
	];

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
					<TablaMostrarOrdenes
						columnas={columnasOrds}
						filas={ordenesClienteActivo}
						cargando={cargando}
					/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<h4>Facturas</h4>
				</TabPanel>
			</div>
		</ModalScroll>
	);
};

export default FacsOrdsCliente;

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
