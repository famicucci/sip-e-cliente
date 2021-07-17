import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import FormularioEnvio from './FormularioEnvio';
import useEnvio from '../../hooks/hookEnvio';
import VentasContext from '../../context/ventas/ventasContext';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Direccion } from '../../functions/envio';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const Envio = () => {
	const classes = useStyles();

	const { filaActiva } = useContext(EditarOrdenesContext);

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
		console.log('submit');
	};

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Envío</Typography>
			</AccordionSummary>
			<AccordionDetails style={{ width: '100%' }}>
				<FormularioEnvio
					stateEnvio={stateEnvio}
					handleSelectDireccion={handleSelectDireccion}
					handleInputDireccion={handleInputDireccion}
					handleSelectTipo={handleSelectTipo}
					handleInputCosto={handleInputCosto}
					handleSwitchDireccion={handleSwitchDireccion}
					onSubmit={onSubmit}
				/>
			</AccordionDetails>
			<Divider />
			<AccordionActions>
				<Button size="small">Cancelar</Button>
				<Button type="submit" form="form-envio" size="small" color="primary">
					Guardar
				</Button>
			</AccordionActions>
		</Accordion>
	);
};

export default Envio;
