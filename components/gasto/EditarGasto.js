import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BotonSuccess from '../generales/botones/BotonSuccess';
import ModalCentrado from '../generales/ModalCentrado';
import GastoContext from '../../context/gasto/GastoContext';
import FormGasto from './FormGasto';

const useStyles = makeStyles(() => ({
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
}));

const EditarGasto = () => {
	const classes = useStyles();
	const {
		expenses,
		openModalEditExpense,
		activatedExpense,
		handleOpenModalEditExpense,
	} = useContext(GastoContext);

	const [expenseToEdit, setExpenseToEdit] = useState({});

	useEffect(() => {
		getExpenseToEdit();
	}, []);

	const getExpenseToEdit = () => {
		const r = expenses.find((x) => x.id === activatedExpense);
		if (r) {
			setExpenseToEdit({
				createdAt: r.createdAt,
				estado: r.estado,
				['GastoCategoria.id']: r['GastoCategoria.id'],
				['GastoSubcategoria.id']: r['GastoSubcategoria.id'],
				descripcion: r.descripcion,
				importe: r.importe,
			});
		}
	};

	return (
		<ModalCentrado
			titulo="Modificar Gasto"
			padding={16}
			width={600}
			openModal={openModalEditExpense}
			handleClose={() => {
				handleOpenModalEditExpense(null);
			}}
			footer={
				<BotonSuccess
					type="submit"
					form="form-gasto"
					contenido="Aceptar"
					className={classes.botonAceptar}
				/>
			}
		>
			<FormGasto
				type="edit"
				initialState={expenseToEdit}
				handleClose={() => {
					handleOpenModalEditExpense(false);
				}}
			/>
		</ModalCentrado>
	);
};

export default EditarGasto;