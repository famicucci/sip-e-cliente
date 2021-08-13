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
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import EditIcon from '@material-ui/icons/Edit';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
	productsActions: { width: '100%' },
}));

// columnas de la tabla
const columnas = [
	{ id: 1, nombre: 'Código', align: 'left', minWidth: 100 },
	{ id: 2, nombre: 'Descripción', align: 'left', minWidth: 400 },
	{ id: 3, nombre: 'Cantidad', align: 'center', minWidth: 100 },
	{
		id: 4,
		nombre: 'Origen',
		align: 'center',
		minWidth: 60,
		boton: true,
		contenidoBoton: <HomeWorkIcon />,
	},
];

const Productos = (props) => {
	const classes = useStyles();
	const router = useRouter();

	return (
		<Accordion defaultExpanded="true">
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Productos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TablaListaProductos
					productos={props.filaActiva.detalleOrden}
					columnas={columnas}
				/>
			</AccordionDetails>
			<Divider />
			<AccordionActions>
				<Box
					className={classes.productsActions}
					display="flex"
					justifyContent="flex-start"
				>
					<BotonFilaTabla
						contenido={<EditIcon />}
						onClick={() => {
							props.editOrder(props.filaActiva);
							router.push('/ventas/nuevo');
						}}
					/>
				</Box>
			</AccordionActions>
		</Accordion>
	);
};

export default Productos;
