import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import SelectPtoVenta from './SelectPtoVenta';
import VentasContext from '../../context/ventas/ventasContext';
import { Grid } from '@material-ui/core';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const MasInformacion = () => {
	const classes = useStyles();

	const {
		ptoVenta,
		ordenEcommerce,
		nota,
		handlePtoVenta,
		handleInputOrdenEcommerce,
	} = useContext(VentasContext);

	const onChangeNroEcommerce = (e) => {
		handleInputOrdenEcommerce(e.target.value);
	};

	const onChangeNota = (e) => {
		handleInputNota(e.target.value);
	};

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Más información</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={1}>
					<Grid item xs={3}>
						<SelectPtoVenta
							ptoVenta={ptoVenta}
							handlePtoVenta={handlePtoVenta}
						/>
					</Grid>
					<InputBordeInferior
						label="Nº Ecommerce"
						name="nroEcommerce"
						placeholder="Escribe el identificador aquí.."
						ancho={9}
						required={true}
						valInit={ordenEcommerce}
						funcModState={onChangeNroEcommerce}
					/>
					<InputBordeInferior
						label="Nota"
						name="nroEcommerce"
						placeholder="Escribe la nota aquí..."
						ancho={12}
						required={true}
						valInit={nota}
						funcModState={onChangeNota}
					/>
				</Grid>
			</AccordionDetails>
			<Divider />
			<AccordionActions>
				<Button size="small">Cancelar</Button>
				<Button size="small" color="primary">
					Guardar
				</Button>
			</AccordionActions>
		</Accordion>
	);
};

export default MasInformacion;
