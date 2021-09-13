import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { Box, Typography } from '@material-ui/core';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles(() => ({
	inputRoot: {
		color: '#fff',
		width: '50px',
		borderBottom: '1px solid #fff',
	},
}));

const SelectBetweenMonths = () => {
	const classes = useStyles();

	const { startDate, endDate, handleStartDate, handleEndDate } =
		useContext(GlobalDataContext);

	useEffect(() => {
		if (!startDate || !endDate) {
			const startOfMonth = getStartDateOfMonth(new Date());
			const endOfMonth = getEndDateOfMonth(new Date());
			handleStartDate(startOfMonth);
			handleEndDate(endOfMonth);
		}
	}, []);

	const onChangeStartDate = (date) => {
		const startOfMonth = getStartDateOfMonth(date);
		handleStartDate(startOfMonth);
	};

	const onChangeEndDate = (date) => {
		const endOfMonth = getEndDateOfMonth(date);
		handleEndDate(endOfMonth);
	};

	const getStartDateOfMonth = (date) => {
		return moment(date).startOf('month').format('YYYY-MM-DD hh:mm');
	};

	const getEndDateOfMonth = (date) => {
		return moment(date).endOf('month').format('YYYY-MM-DD hh:mm');
	};

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
						onChange={onChangeStartDate}
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
						onChange={onChangeEndDate}
					/>
				</MuiPickersUtilsProvider>
			</Box>
		</Box>
	);
};

export default SelectBetweenMonths;
