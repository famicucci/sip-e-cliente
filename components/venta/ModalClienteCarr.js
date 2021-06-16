import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: 550,
		borderRadius: '5px',
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
				<h1>Desde Modal abierto por botonera</h1>
			</Fade>
		</Modal>
	);
};

export default ModalClienteCar;
