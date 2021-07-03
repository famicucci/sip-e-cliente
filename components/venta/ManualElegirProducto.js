import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BuscadorPapper from '../generales/BuscadorPapper';
import RadioElegirProductos from './RadioElegirProductos';
import SelectListaPrecio from './SelectListaPrecioVenta';
import TablaElegirProducto from '../tablas/TablaElegirProducto';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles(() => ({
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
}));

const ManualElegirProducto = () => {
	const classes = useStyles();

	const { busqueda, handleBusqueda } = useContext(BarraHerramientasContext);

	return (
		<div className={classes.container}>
			<Box>
				<BuscadorPapper busqueda={busqueda} handleBusqueda={handleBusqueda} />
				<RadioElegirProductos />
				<SelectListaPrecio />
			</Box>
			<TablaElegirProducto />
		</div>
	);
};

export default ManualElegirProducto;
