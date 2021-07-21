import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Box } from '@material-ui/core';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { DetalleOrden } from '../../functions/editarordenes';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
	texto: {
		fontSize: '17px',
	},
	textoConBoton: {
		fontSize: '17px',
		marginLeft: theme.spacing(1),
	},
	box: {
		width: '100%',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(5),
	},
}));

const ImporteCrearFactura = () => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState({ expanded: false });
	const [expandeDescuento, setExpandeDescuento] = useState(false);
	const [subtotal, setSubtotal] = useState('');

	const { filaActiva, modificarOrden } = useContext(EditarOrdenesContext);

	useEffect(() => {
		// console.log(filaActiva);
		const detalleOrden = new DetalleOrden(filaActiva.detalleOrden);
		const r = detalleOrden.subtotal();
		setSubtotal(r);
	}, [filaActiva.detalleOrden]);

	const onSubmit = (e) => {
		e.preventDefault();

		console.log('crear factura');
	};

	const onClickSummary = () => {
		if (expanded.expanded === true) {
			setExpanded({ expanded: false });
		} else if (expanded.expanded === false) {
			setExpanded({ expanded: true });
		}
	};

	return (
		<Accordion {...expanded}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				onClick={onClickSummary}
			>
				<Typography className={classes.heading}>Totales</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<div style={{ width: '100%' }}>
					<Box
						display="flex"
						p={1}
						bgcolor="background.paper"
						className={classes.box}
					>
						<Box flexGrow={1}>
							<Typography className={classes.texto} variant="overline">
								Subtotal:
							</Typography>
						</Box>
						<Box>
							<BotonFilaTabla
								contenido={
									!expandeDescuento ? (
										<ArrowDropDownIcon />
									) : (
										<ArrowDropUpIcon />
									)
								}
								onClick={() => {
									setExpandeDescuento(!expandeDescuento);
								}}
							/>
							<Typography className={classes.textoConBoton} variant="overline">
								{new Intl.NumberFormat('de-De', {
									style: 'decimal',
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								}).format(subtotal)}
							</Typography>
						</Box>
					</Box>

					<Collapse in={expandeDescuento} timeout="auto" unmountOnExit>
						<Box
							display="flex"
							p={1}
							bgcolor="background.paper"
							className={classes.box}
						>
							<Box flexGrow={1}>
								<Typography className={classes.texto} variant="overline">
									Descuento:
								</Typography>
							</Box>
							<Box>
								<Typography className={classes.texto} variant="overline">
									{new Intl.NumberFormat('de-De', {
										style: 'decimal',
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(10)}
								</Typography>
							</Box>
						</Box>
					</Collapse>

					<Box
						display="flex"
						p={1}
						bgcolor="background.paper"
						className={classes.box}
					>
						<Box flexGrow={1}>
							<Typography className={classes.texto} variant="overline">
								Envío:
							</Typography>
						</Box>
						<Box>
							<Typography className={classes.texto} variant="overline">
								{new Intl.NumberFormat('de-De', {
									style: 'decimal',
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								}).format(10)}
							</Typography>
						</Box>
					</Box>
					<Box
						display="flex"
						p={1}
						bgcolor="background.paper"
						className={classes.box}
					>
						<Box flexGrow={1}>
							<Typography className={classes.texto} variant="overline">
								Importe Total:
							</Typography>
						</Box>
						<Box>
							<Typography className={classes.texto} variant="overline">
								{new Intl.NumberFormat('de-De', {
									style: 'decimal',
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								}).format(10)}
							</Typography>
						</Box>
					</Box>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default ImporteCrearFactura;
