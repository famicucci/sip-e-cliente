import React, { useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import RowColorIntercalado from '../generales/RowColorIntercalado';
import moment from 'moment';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import GastoContext from '../../context/gasto/GastoContext';
import SelectStatusPayment from './SelectStatusPayment';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const FilaGastos = (props) => {
	const { expenseCategories, expenseSubcategories } =
		useContext(GlobalDataContext);
	const { handleOpenModalEditExpense } = useContext(GastoContext);

	const getCategorie = (categorieId) => {
		const r = expenseCategories.find((x) => x.id === categorieId);
		if (r) return r.descripcion;
	};

	const getSubcategorie = (subcategorieId) => {
		const r = expenseSubcategories.find((x) => x.id === subcategorieId);
		if (r) return r.descripcion;
	};

	return (
		<RowColorIntercalado>
			<TableCell align="center">
				<SelectStatusPayment
					content={props.fila.estado}
					expenseId={props.fila.id}
				/>
			</TableCell>
			<TableCell align="center">
				{moment(props.fila.createdAt).format('DD-MM-YYYY')}
			</TableCell>
			<TableCell align="left">
				{expenseCategories ? getCategorie(props.fila.GastoCategoriaId) : '-'}
			</TableCell>
			<TableCell align="left">
				{expenseSubcategories
					? getSubcategorie(props.fila.GastoSubcategoriaId)
					: '-'}
			</TableCell>
			<TableCell align="left">{props.fila.descripcion}</TableCell>
			<TableCell align="center">
				{parseFloat(props.fila.importe).toFixed(2)}
			</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
					onClick={() => {
						handleOpenModalEditExpense(props.fila.id);
					}}
				>
					<EditOutlinedIcon />
				</IconButton>
			</TableCell>
		</RowColorIntercalado>
	);
};

export default FilaGastos;
