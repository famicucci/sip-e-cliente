import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TablaListaProductos from '../generales/TablaListaProductos';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const Productos = ({ productos }) => {
	const classes = useStyles();

	return (
		<Accordion defaultExpanded="true">
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Productos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TablaListaProductos productos={productos} />
			</AccordionDetails>
		</Accordion>
	);
};

export default Productos;
