import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import ChartRevenuesVsExpenses from './ChartRevenuesVsExpenses';
import BarraHerramientasContext from '../../context/barraHerramientas/barraHerramientasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		width: '100%',
		height: '100%',
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

const DisplayCharts = () => {
	const classes = useStyles();

	const { handleToolsReports } = useContext(BarraHerramientasContext);

	useEffect(() => {
		handleToolsReports();
	}, []);

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={3}>
						<ChartRevenuesVsExpenses />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default DisplayCharts;
