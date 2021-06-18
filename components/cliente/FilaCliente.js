import React, { useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import VentasContext from '../../context/ventas/ventasContext';
import { BotoneraCarrContext } from '../../context/BotoneraCarrContext';

const FilaCliente = (props) => {
	const { nombre, apellido, email } = props.fila;

	const { handleCliente } = useContext(VentasContext);
	const { handleClose } = useContext(BotoneraCarrContext);

	return (
		<TableRow hover>
			<TableCell component="th" scope="row">
				{`${nombre} ${apellido}`}
			</TableCell>
			<TableCell align="left">{email}</TableCell>
			<TableCell align="left">
				<BotonFilaTabla
					contenido={<AddIcon />}
					onClick={() => {
						handleCliente(props.fila);
						handleClose();
					}}
				/>
			</TableCell>
		</TableRow>
	);
};

export default FilaCliente;
