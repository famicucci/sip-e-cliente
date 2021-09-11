import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

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

	const [chartData, setChartData] = useState({});

	const chart = () => {
		setChartData({
			labels: ['marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto'],
			datasets: [
				{
					label: 'Ingresos totales',
					data: [600000, 850000, 468000, 730000, 947000, 800000],
					borderColor: 'rgb(75, 192, 192)',
					borderWidth: 3,
					tension: 0.1,
				},
			],
		});
	};

	useEffect(() => {
		chart();
	}, []);

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={3}>
						<Line
							data={chartData}
							options={{
								responsive: true,
							}}
						/>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={3}>
						<Line
							data={chartData}
							options={{
								responsive: true,
								title: { text: 'Ingresos totales', display: false },
							}}
						/>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default DisplayCharts;
