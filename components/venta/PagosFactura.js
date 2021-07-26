import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { FacturaBD } from '../../functions/Factura';
import ImporteFlexGrow from '../generales/ImporteFlexGrow';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
	texto: {
		fontSize: '17px',
	},
	divPadre: {
		width: '100%',
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(5),
	},
	paperPago: {
		width: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1),
		borderColor: theme.palette.success.main,
	},
	paperNoHayPago: {
		width: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1),
		borderColor: theme.palette.grey[600],
	},
	paperRealizarPago: {
		width: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(1),
		textAlign: 'center',
		borderColor: theme.palette.grey[600],
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: theme.palette.grey[200],
		},
	},
}));

const PagosFactura = () => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState({ expanded: false });

	const { filaActiva, handleOpenModalCrearPago } =
		useContext(EditarOrdenesContext);

	const pagos = filaActiva.Factura.Pagos;
	let pagosMod = [];
	for (let i = 0; i < pagos.length; i++) {
		const element = pagos[i];
		const pago = { ...element, key: i + 1 };
		pagosMod.push(pago);
	}

	const factura = new FacturaBD(filaActiva.Factura);

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
				<Typography className={classes.heading}>Pagos</Typography>
			</AccordionSummary>
			<AccordionDetails style={{ width: '100%' }}>
				<div className={classes.divPadre}>
					{pagosMod.length > 0 ? (
						<>
							{pagosMod.map((x) => (
								<Paper className={classes.paperPago} variant="outlined">
									<Grid container>
										<Grid item xs={1} style={{ fontWeight: 'bold' }}>
											{x.key}
										</Grid>
										<Grid item xs={4}>
											{x.MetodoPago.descripcion}
										</Grid>
										<Grid item xs={3} style={{ textAlign: 'center' }}>
											{moment(x.createdAt).format('DD-MM-YYYY')}
										</Grid>
										<Grid item xs={4} style={{ textAlign: 'right' }}>
											{parseFloat(x.importe).toFixed(2)}
										</Grid>
									</Grid>
								</Paper>
							))}
						</>
					) : (
						<Paper className={classes.paperNoHayPago} variant="outlined">
							<Typography align="center">No hay pagos realizados</Typography>
						</Paper>
					)}
					{factura.importeFinal - factura.sumaPagos() > 0 ? (
						<Paper
							className={classes.paperRealizarPago}
							variant="outlined"
							onClick={() => {
								handleOpenModalCrearPago();
							}}
						>
							<AddIcon fontSize="small" />
						</Paper>
					) : null}
					<ImporteFlexGrow titulo="total pagado" childrenNumDecimal>
						{factura.sumaPagos()}
					</ImporteFlexGrow>
					<ImporteFlexGrow titulo="queda por pagar" childrenNumDecimal>
						{factura.importeFinal - factura.sumaPagos()}
					</ImporteFlexGrow>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default PagosFactura;
