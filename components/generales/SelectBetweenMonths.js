import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	inputRoot: {
		color: '#fff',
		width: '50px',
		borderBottom: '1px solid #fff',
	},
}));

const SelectBetweenMonths = () => {
	const classes = useStyles();
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	useEffect(() => {
		const startOfMonth = moment(startDate)
			.startOf('month')
			.format('YYYY-MM-DD hh:mm');
		const endOfMonth = moment(endDate)
			.endOf('month')
			.format('YYYY-MM-DD hh:mm');
	}, [startDate, endDate]);

	return (
		<Box display="flex">
			<Box>
				<MuiPickersUtilsProvider
					utils={DateFnsUtils}
					locale={es}
					className={classes.root}
				>
					<DatePicker
						variant="inline"
						openTo="month"
						views={['year', 'month']}
						format="MM/yy"
						value={startDate}
						InputProps={{ classes: { root: classes.inputRoot } }}
						onChange={setStartDate}
					/>
				</MuiPickersUtilsProvider>
			</Box>
			<Box
				display="flex"
				alignItems="flex-end"
				style={{ marginLeft: '16px', marginRight: '16px', marginBottom: '4px' }}
			>
				<Typography>hasta</Typography>
			</Box>
			<Box>
				<MuiPickersUtilsProvider
					utils={DateFnsUtils}
					locale={es}
					className={classes.root}
				>
					<DatePicker
						variant="inline"
						openTo="month"
						views={['year', 'month']}
						format="MM/yy"
						value={endDate}
						InputProps={{ classes: { root: classes.inputRoot } }}
						onChange={setEndDate}
					/>
				</MuiPickersUtilsProvider>
			</Box>
		</Box>
	);
};

export default SelectBetweenMonths;
