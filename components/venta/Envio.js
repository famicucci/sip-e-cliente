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

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const Envio = () => {
	const cliente = {
		nombre: 'julieta',
		apellido: 'almis',
		direcciones: [
			{ id: 1, descripcion: 'Nora Lange 962, VGB, Córdoba, Argentina' },
			{ id: 2, descripcion: 'Av. Julio a Roca 147, VGB, Córdoba, Argentina' },
		],
	};
	const classes = useStyles();

	const { envio } = useContext(VentasContext);
	const [
		modoDirecc,
		valSelectDireccion,
		valInputDireccion,
		valSelectTipo,
		valInputCosto,
		setModoDirecc,
		handleSelectDireccion,
		handleInputDireccion,
		handleSelectTipo,
		handleInputCosto,
	] = useEnvio(envio);

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Envío</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<FormularioEnvio
					modoDirecc={modoDirecc}
					cliente={cliente}
					valSelectDireccion={valSelectDireccion}
					handleSelectDireccion={handleSelectDireccion}
					valInputDireccion={valInputDireccion}
					handleInputDireccion={handleInputDireccion}
					valSelectTipo={valSelectTipo}
					handleSelectTipo={handleSelectTipo}
					valInputCosto={valInputCosto}
					handleInputCosto={handleInputCosto}
					setModoDirecc={setModoDirecc}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

export default Envio;
