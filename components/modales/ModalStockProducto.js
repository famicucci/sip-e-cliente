import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BotonCantidadEditable from '../tablas/componentes/BotonCantidadEditable';
import ValorCantidad from '../tablas/componentes/ValorCantidadEditable';
import StockContext from '../../context/stock/stockContext';

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

	const { openModal, productoActivo, handleClose } = useContext(StockContext);

	if (Object.entries(productoActivo).length === 0) return null;

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
				<div className={classes.paper}>
					<h2 align="center">
						{Object.entries(productoActivo).length !== 0
							? productoActivo[0]['ProductoCodigo']
							: null}
					</h2>
					<p align="center">
						{Object.entries(productoActivo).length !== 0
							? productoActivo[0]['Producto.descripcion']
							: null}
					</p>
					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								{productoActivo.map((row) => (
									<TableRow key={row.id}>
										<TableCell component="th" scope="row">
											{row['PtoStock.descripcion']}
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
