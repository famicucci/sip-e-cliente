import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CallMadeIcon from '@material-ui/icons/CallMade';
import IconButton from '@material-ui/core/IconButton';
import { ModalContext } from '../../../context/ModalContext';

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const FilaStockProducto = (props) => {
	const { id, codigo, descripcion, cantidad } = props.fila;
	const { setIdFila } = useContext(ModalContext);

	return (
		<StyledTableRow>
			<TableCell component="th" scope="row">
				{codigo}
			</TableCell>
			<TableCell align="left">{descripcion}</TableCell>
			<TableCell align="center">{cantidad}</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
					onClick={() => {
						setIdFila(id);
					}}
				>
					<CallMadeIcon />
				</IconButton>
			</TableCell>
		</StyledTableRow>
	);
};

export default FilaStockProducto;
