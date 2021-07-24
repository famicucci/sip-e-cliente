import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { Box, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		width: (props) => (props.width ? props.width : 600),
		borderRadius: '10px',
		padding: (props) => (props.padding ? props.padding : null),
	},
	contenido: { marginLeft: theme.spacing(2), marginRight: theme.spacing(2) },
	dividerSuperior: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
	},
	dividerInferior: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(3),
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
}));

const ModalCentrado2 = (props) => {
	const classes = useStyles(props);

	return (
		<Modal
			className={classes.modal}
			open={props.openModal}
			onClose={() => {
				props.handleClose();
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.openModal}>
				<Paper className={classes.paper}>
					<Typography variant="h5" align="left">
						{props.titulo}
					</Typography>
					<Divider className={classes.dividerSuperior} variant="fullWidth" />
					<Box className={classes.contenido}>{props.children}</Box>
					{props.footer ? (
						<>
							<Divider
								className={classes.dividerInferior}
								variant="fullWidth"
							/>
							<Box className={classes.footer}>{props.footer}</Box>
						</>
					) : null}
				</Paper>
			</Fade>
		</Modal>
	);
};

export default ModalCentrado2;
