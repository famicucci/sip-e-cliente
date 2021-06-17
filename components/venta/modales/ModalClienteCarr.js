import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AgregarClienteCarr from '../AgregarClienteCarr';
import { BotoneraCarrContext } from '../../../context/BotoneraCarrContext';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		overflowY: 'auto',
		paddingTop: 100,
		paddingBottom: 60,
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		maxWidth: 650,
		borderRadius: '10px',
	},
}));

const ModalClienteCar = () => {
	const classes = useStyles();

	const { openModal, handleClose } = useContext(BotoneraCarrContext);

	return (
		<Modal
			className={classes.modal}
			open={openModal}
			onClose={() => {
				handleClose();
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={openModal}>
				<Paper className={classes.paper}>
					<AgregarClienteCarr />
				</Paper>
			</Fade>
		</Modal>
	);
};

export default ModalClienteCar;
