import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alerta = ({ mensaje, severidad }) => {
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severidad}>
				{mensaje}
			</Alert>
		</Snackbar>
	);
};

export default Alerta;
