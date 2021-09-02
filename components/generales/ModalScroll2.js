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
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		overflowY: 'scroll',
		paddingTop: 100,
		paddingBottom: 60,
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		maxWidth: 800,
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
	dividerVertical: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
	footer: {
		marginLeft: theme.spacing(2),
	},
}));

const ModalScroll2 = (props) => {
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
					<Box
						display="flex"
						justifyContent="flex-center"
						alignItems="flex-end"
					>
						<Typography variant="h5" align="left">
							{props.titulo}
						</Typography>
						{props.anexoTitulo ? (
							<>
								<Divider
									className={classes.dividerVertical}
									orientation="vertical"
									variant="inset"
									flexItem
								/>
								<Box>
									<Typography align="left">{props.anexoTitulo}</Typography>
								</Box>
							</>
						) : null}
					</Box>
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

export default ModalScroll2;
