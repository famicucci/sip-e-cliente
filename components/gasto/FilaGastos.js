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
	const { fila } = props;

	const { expenseCategories, expenseSubcategories } =
		useContext(GlobalDataContext);
	const { handleActivateExpense } = useContext(GastoContext);

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
				<SelectStatusPayment content={fila.estado} expenseId={fila.id} />
			</TableCell>
			<TableCell align="center">
				{moment(fila.createdAt).format('DD-MM-YYYY')}
			</TableCell>
			<TableCell align="left">
				{expenseCategories ? getCategorie(fila['GastoCategoria.id']) : '-'}
			</TableCell>
			<TableCell align="left">
				{expenseSubcategories
					? getSubcategorie(fila['GastoSubcategoria.id'])
					: '-'}
			</TableCell>
			<TableCell align="left">{fila.descripcion}</TableCell>
			<TableCell align="center">
				{parseFloat(fila.importe).toFixed(2)}
			</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
					onClick={() => {
						handleActivateExpense(fila.id);
					}}
				>
					<EditOutlinedIcon />
				</IconButton>
			</TableCell>
		</RowColorIntercalado>
	);
};

export default FilaGastos;
