import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import InputFecha from '../generales/inputs/InputFecha';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import { Grid } from '@material-ui/core';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../generales/Alerta';
import GastoContext from '../../context/gasto/GastoContext';

const useStyles = makeStyles(() => ({
	form: { width: '100%' },
}));

const FormGasto = (props) => {
	const classes = useStyles();

	const {
		expenseCategories,
		expenseSubcategories,
		getCategorieExpenses,
		getSubcategorieExpenses,
	} = useContext(GlobalDataContext);
	const { createExpense, editExpense } = useContext(GastoContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	const [expense, setExpense] = useState(
		props.initialState && props.type === 'edit'
			? props.initialState
			: {
					createdAt: moment(new Date()).toISOString(),
					estado: 'Pendiente',
					['GastoCategoria.id']: null,
					['GastoSubcategoria.id']: null,
					descripcion: '',
					importe: '',
			  }
	);
	const [subcategories, setSubcategories] = useState(null);

	useEffect(() => {
		if (!expenseCategories || expenseSubcategories) {
			getCategorieExpenses();
			getSubcategorieExpenses();
		}
	}, []);

	useEffect(() => {
		const r = getSubcategoriesFromCategorie(expense['GastoCategoria.id']);
		setSubcategories(r);
	}, [expense['GastoCategoria.id']]);

	const handleDate = (date) => {
		setExpense({ ...expense, createdAt: moment(date).toISOString() });
	};

	const handleAtributte = (name, value) => {
		setExpense({ ...expense, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validation
		if (!expense['GastoCategoria.id']) {
			mostrarAlerta('Debes elegir una categoría', 'error');
			return;
		}

		if (!expense['GastoSubcategoria.id']) {
			mostrarAlerta('Debes elegir una Subcategoría', 'error');
			return;
		}

		if (!expense.descripcion) {
			mostrarAlerta('Coloca una descripción', 'error');
			return;
		}

		if (!expense.importe) {
			mostrarAlerta('Coloca un importe', 'error');
			return;
		}

		if (props.type === 'create') createExpense(expense);
		else if (props.type === 'edit') editExpense(expense);

		// close modal
		if (props.handleClose) props.handleClose();
	};

	const getSubcategoriesFromCategorie = (categorieId) => {
		const r = expenseSubcategories.filter(
			(x) => x.GastoCategoriaId === categorieId
		);
		return r;
	};

	const paymentStatus = {
		name: 'estado',
		label: 'Estado del Pago',
		ancho: 6,
		data: [
			{ id: 10, descripcion: 'Pago' },
			{ id: 20, descripcion: 'Pendiente' },
		],
		initialvalue: expense.estado === 'Pago' ? 10 : 20,
		placeholder: 'Elegir estado del pago',
	};

	const expenseCategorie = {
		name: 'GastoCategoria.id',
		label: 'Categoría',
		ancho: 6,
		data: expenseCategories,
		initialvalue: expense['GastoCategoria.id']
			? expense['GastoCategoria.id']
			: 'none',
		placeholder: 'Elegir Categoría',
	};

	const expenseSubcategorie = {
		name: 'GastoSubcategoria.id',
		label: 'Subcategoría',
		ancho: 6,
		data: subcategories,
		initialvalue:
			subcategories && expense['GastoSubcategoria.id']
				? expense['GastoSubcategoria.id']
				: 'none',
		placeholder: subcategories
			? 'Elige primero una categoría'
			: 'Elegir Subcategoría',
	};

	const expenseDescription = {
		name: 'descripcion',
		label: 'Descripción',
		ancho: 6,
		initialvalue: expense.descripcion ? expense.descripcion : '',
		placeholder: 'Escribe una dirección',
	};

	const expenseAmount = {
		label: 'Importe',
		name: 'importe',
		placeholder: 'Escribe un importe',
		ancho: 6,
		initialvalue: expense.importe ? expense.importe : '',
	};

	return (
		<form className={classes.form} id="form-gasto" onSubmit={onSubmit}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<InputFecha
						initialValue={expense.createdAt}
						tochangestate={handleDate}
					/>
				</Grid>
				<SelectBordeInferior
					name={paymentStatus.name}
					label={paymentStatus.label}
					ancho={paymentStatus.ancho}
					data={paymentStatus.data}
					initialvalue={paymentStatus.initialvalue}
					placeholder={paymentStatus.placeholder}
					tochangestate={handleAtributte}
					getDescription
				/>
				<SelectBordeInferior
					name={expenseCategorie.name}
					label={expenseCategorie.label}
					ancho={expenseCategorie.ancho}
					data={expenseCategorie.data}
					initialvalue={expenseCategorie.initialvalue}
					placeholder={expenseCategorie.placeholder}
					tochangestate={handleAtributte}
				/>
				{subcategories ? (
					<SelectBordeInferior
						name={expenseSubcategorie.name}
						label={expenseSubcategorie.label}
						ancho={expenseSubcategorie.ancho}
						data={expenseSubcategorie.data}
						initialvalue={expenseSubcategorie.initialvalue}
						placeholder={expenseSubcategorie.placeholder}
						tochangestate={handleAtributte}
					/>
				) : null}
				<InputBordeInferior
					name={expenseDescription.name}
					label={expenseDescription.label}
					placeholder={expenseDescription.placeholder}
					ancho={expenseDescription.ancho}
					initialvalue={expenseDescription.initialvalue}
					tochangestate={handleAtributte}
				/>
				<InputNumberBordeInferior
					label={expenseAmount.label}
					name={expenseAmount.name}
					placeholder={expenseAmount.placeholder}
					ancho={expenseAmount.ancho}
					initialvalue={expenseAmount.initialvalue}
					tochangestate={handleAtributte}
				/>
			</Grid>
			{alerta !== null ? <Alerta /> : null}
		</form>
	);
};

export default FormGasto;
