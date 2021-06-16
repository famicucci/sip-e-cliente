import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputNuevoCliente from './InputNuevoCliente';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const MasDatosNuevoCliente = () => {
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel2a-content"
				id="panel2a-header"
			>
				<Typography className={classes.heading}>Más Datos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget.
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default MasDatosNuevoCliente;
