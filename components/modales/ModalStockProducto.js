import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalContext } from '../../context/ModalContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BotonCantidadEditable from '../tablas/componentes/BotonCantidadEditable';
import ValorCantidad from '../tablas/componentes/ValorCantidadEditable';

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

const ModalStockProducto = () => {
	const classes = useStyles();

	const { open, productoStock, handleClose } = useContext(ModalContext);

	if (Object.entries(productoStock).length === 0) return null;

	return (
		<Modal
			className={classes.modal}
			open={open}
			onClose={() => {
				handleClose();
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<h2 align="center">
						{Object.entries(productoStock).length !== 0
							? productoStock[0]['codigo']
							: null}
					</h2>
					<p align="center">
						{Object.entries(productoStock).length !== 0
							? productoStock[0]['descripcion']
							: null}
					</p>
					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								{productoStock.map((row) => (
									<TableRow key={row.id}>
										<TableCell component="th" scope="row">
											{row.descripcionPuntoStock}
										</TableCell>
										<TableCell style={{ width: 160 }} align="right">
											<ValorCantidad fila={row} />
										</TableCell>
										<TableCell style={{ width: 160 }} align="right">
											<BotonCantidadEditable fila={row} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</Fade>
		</Modal>
	);
};

export default ModalStockProducto;
