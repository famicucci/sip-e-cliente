import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import FormularioEnvio from './FormularioEnvio';
import useEnvio from '../../hooks/useEnvio';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Envio } from '../../functions/envio';

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

	const { filaActiva, modificarOrden } = useContext(EditarOrdenesContext);

	const envioObj = {
		valSelectDirecc: undefined,
		modoDirecc: 'input',
		valInputDirecc: filaActiva.direccionEnvio,
		valSelectTipo: filaActiva.TipoEnvio.id,
		valInputCosto: filaActiva.tarifaEnvio,
	};

	const [
		stateEnvio,
		handleSelectDireccion,
		handleInputDireccion,
		handleSelectTipo,
		handleInputCosto,
		handleSwitchDireccion,
	] = useEnvio(envioObj, filaActiva.Cliente.direcciones);

	const onSubmit = (e) => {
		e.preventDefault();

		const ordenId = filaActiva.id;

		const direcc = new Envio(
			stateEnvio.modoDirecc,
			stateEnvio.valSelectDireccion,
			stateEnvio.valInputDireccion,
			stateEnvio.dataDirecciones
		);

		const datos = {
			direccionEnvio: direcc.getDireccionSegunModoDirecc(),
			tipoEnvioId: stateEnvio.valSelectTipo,
			tarifaEnvio: stateEnvio.valInputCosto,
		};

		modificarOrden(ordenId, datos);
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
					stateEnvio={stateEnvio}
					handleSelectDireccion={handleSelectDireccion}
					handleInputDireccion={handleInputDireccion}
					handleSelectTipo={handleSelectTipo}
					handleInputCosto={handleInputCosto}
					handleSwitchDireccion={handleSwitchDireccion}
					onSubmit={onSubmit}
					facturasOrden={filaActiva.Facturas ? filaActiva.Facturas : []}
				/>
			</AccordionDetails>
			<Divider />
			<AccordionActions>
				<Button
					className={classes.botonGuardar}
					type="submit"
					form="form-envio"
					size="small"
					color="primary"
				>
					Guardar
				</Button>
			</AccordionActions>
		</Accordion>
	);
};

export default EnvioDetalleOrden;
