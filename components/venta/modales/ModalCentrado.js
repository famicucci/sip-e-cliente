import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { BotoneraCarrContext } from '../../../context/BotoneraCarrContext';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const StyledPaper = withStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		maxWidth: 650,
		borderRadius: 10,
		width: 600,
		padding: (props) => (props.p ? theme.spacing(props.p) : theme.spacing(2)),
	},
}))(Paper);

const ModalCentrado = ({ contenido, openModal, p }) => {
	const classes = useStyles();

	const { handleClose } = useContext(BotoneraCarrContext);

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
				<StyledPaper p={p}>{contenido}</StyledPaper>
			</Fade>
		</Modal>
	);
};

export default ModalCentrado;
