import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

const InputFecha = (props) => {
	const [selectedDate, setSelectedDate] = React.useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
		props.funcModState(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					format="MM/dd/yyyy"
					// margin="normal"
					id="date-picker-inline"
					label="Fecha"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default InputFecha;
