import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TablaListaProductos from '../generales/TablaListaProductos';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
}));

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 300 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{ id: 3, nombre: 'Precio', align: 'center', minWidth: 100 },
	{ id: 3, nombre: 'Total', align: 'center', minWidth: 100 },
];

const ProductosCrearFactura = ({ productos }) => {
	const classes = useStyles();

	return (
		<Accordion defaultExpanded="true">
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Productos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TablaListaProductos productos={productos} columnas={columnas} />
			</AccordionDetails>
		</Accordion>
	);
};

export default ProductosCrearFactura;
