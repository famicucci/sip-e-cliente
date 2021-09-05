import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import FormularioEnvio from './FormularioEnvio';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Direccion } from '../../functions/envio';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
}));

const EnvioDetalleOrden = () => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState({ expanded: false });

	const { shippingTypes } = useContext(GlobalDataContext);
	const { filaActiva, modificarOrden } = useContext(EditarOrdenesContext);

	const envioInit = {
		modoDirecc: 'input',
		input: filaActiva.direccionEnvio,
		select: null,
		tipo: filaActiva.TipoEnvioId,
		costo: filaActiva.tarifaEnvio,
	};

	const modShipping = (stateEnvio) => {
		const ordenId = filaActiva.id;
		const tarifaEnvio = stateEnvio.costo;
		const TipoEnvioId = stateEnvio.tipo;

		const handleAdress = () => {
			if (stateEnvio.modoDirecc === 'input') {
				return stateEnvio.input;
			} else if (stateEnvio.modoDirecc === 'select') {
				return Direccion.transformDirection(stateEnvio.select);
			}
		};

		const direccionEnvio = handleAdress();

		const data = { tarifaEnvio, TipoEnvioId, direccionEnvio };

		modificarOrden(ordenId, data);
		setExpanded({ expanded: false });
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
				<Typography className={classes.heading}>Envío</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<FormularioEnvio
					facturasOrden={filaActiva.Facturas ? filaActiva.Facturas : []}
					// handleClose={handleClose}
					envioInit={envioInit}
					tiposEnvio={shippingTypes}
					cliente={filaActiva.Cliente}
					handleEnvio={modShipping}
				/>
			</AccordionDetails>
			<Divider />
			<AccordionActions>
				{/* <Button
					className={classes.botonGuardar}
					type="submit"
					form="form-envio"
					size="small"
					color="primary"
				>
					Guardar
				</Button> */}
				<IconButton size="small">
					<EditOutlinedIcon />
				</IconButton>
				<IconButton size="small">
					<SaveOutlinedIcon />
				</IconButton>
			</AccordionActions>
		</Accordion>
	);
};

export default EnvioDetalleOrden;
