import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import ChartGrossRevenue from './ChartGrossRevenue';

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

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={3}>
						<ChartGrossRevenue />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default DisplayCharts;
