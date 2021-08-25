import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import SelectPtoVenta from './SelectPtoVenta';
import { Grid } from '@material-ui/core';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';

const useStyles = makeStyles((theme) => ({
	form: { width: '100%' },
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	botonGuardar: { color: theme.palette.success.main },
}));

const MasInformacion = () => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState({ expanded: false });

	const { filaActiva, modificarOrden } = useContext(EditarOrdenesContext);

	const [masInformacion, setMasInformacion] = useState({
		PtoVentaId: filaActiva.PtoVenta.id,
		observaciones: filaActiva.observaciones,
		ordenEcommerce: filaActiva.ordenEcommerce,
	});

	const onChangePtoVenta = (value) => {
		setMasInformacion({
			...masInformacion,
			PtoVentaId: value,
		});
	};

	const onChangeNroEcommerce = (name, value) => {
		setMasInformacion({
			...masInformacion,
			ordenEcommerce: value,
		});
	};

	const onChangeNota = (name, value) => {
		setMasInformacion({
			...masInformacion,
			observaciones: value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		modificarOrden(filaActiva.id, masInformacion);

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
				<Typography className={classes.heading}>Más información</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<form
					className={classes.form}
					id="form-mas-informacion"
					onSubmit={onSubmit}
				>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<SelectPtoVenta
								ptoVenta={masInformacion.PtoVentaId}
								handlePtoVenta={onChangePtoVenta}
							/>
						</Grid>
						<InputBordeInferior
							label="Nº Ecommerce"
							name="nroEcommerce"
							placeholder="Escribe el identificador aquí.."
							ancho={9}
							required={true}
							initialvalue={masInformacion.ordenEcommerce}
							tochangestate={onChangeNroEcommerce}
						/>
						<InputBordeInferior
							label="Nota"
							name="nota"
							placeholder="Escribe la nota aquí..."
							ancho={12}
							required={true}
							initialvalue={masInformacion.observaciones}
							tochangestate={onChangeNota}
						/>
					</Grid>
				</form>
			</AccordionDetails>
			<Divider />
			<AccordionActions>
				<Button
					className={classes.botonGuardar}
					type="submit"
					form="form-mas-informacion"
					size="small"
				>
					Guardar
				</Button>
			</AccordionActions>
		</Accordion>
	);
};

export default MasInformacion;
