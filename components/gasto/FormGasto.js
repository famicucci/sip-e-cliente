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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	form: { width: '100%' },
	formControl: {
		width: '100%',
		marginTop: (props) =>
			props.marginTop ? theme.spacing(props.marginTop) : theme.spacing(0),
		minWidth: 100,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
	},
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
					GastoCategoriaId: 'none',
					GastoSubcategoriaId: 'none',
					descripcion: '',
					importe: '',
			  }
	);

	const getSubcategoriesFromCategorie = (categorieId) => {
		return expenseSubcategories.filter(
			(x) => x.GastoCategoriaId === categorieId
		);
	};

	const [data, setData] = useState(
		getSubcategoriesFromCategorie(expense.GastoCategoriaId)
			? getSubcategoriesFromCategorie(expense.GastoCategoriaId)
			: []
	);

	useEffect(() => {
		if (!expenseCategories || expenseSubcategories) {
			getCategorieExpenses();
			getSubcategorieExpenses();
		}
	}, []);

	const handleDate = (date) => {
		setExpense({ ...expense, createdAt: moment(date).toISOString() });
	};

	const handleAtributte = (name, value) => {
		setExpense({ ...expense, [name]: value });
	};

	const onChange = (e) => {
		setExpense({ ...expense, [e.target.name]: e.target.value });
	};

	const onChangeCategorie = (e) => {
		const r = getSubcategoriesFromCategorie(e.target.value);
		setData(r);

		setExpense({
			...expense,
			[e.target.name]: e.target.value,
			GastoSubcategoriaId: 'none',
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validation
		if (!expense.GastoCategoriaId === 'none') {
			mostrarAlerta('Debes elegir una categoría', 'error');
			return;
		}

		if (expense.GastoSubcategoriaId === 'none') {
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
				<Grid item xs={6}>
					<FormControl className={classes.formControl}>
						<InputLabel shrink>Categoría</InputLabel>
						<Select
							name="GastoCategoriaId"
							value={expense.GastoCategoriaId}
							onChange={onChangeCategorie}
							displayEmpty
							className={classes.selectEmpty}
						>
							<MenuItem value="none" disabled>
								<Typography color="textSecondary">
									Elige una categoría
								</Typography>
							</MenuItem>
							{expenseCategories.map((x) => (
								<MenuItem key={x.id} value={x.id}>
									{x.descripcion}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={6}>
					<FormControl className={classes.formControl}>
						<InputLabel shrink>Subcategoría</InputLabel>
						<Select
							name="GastoSubcategoriaId"
							value={expense.GastoSubcategoriaId}
							onChange={onChange}
							displayEmpty
							className={classes.selectEmpty}
						>
							<MenuItem value="none" disabled>
								<Typography color="textSecondary">
									{expense.GastoCategoriaId !== 'none'
										? 'Elige una subcategoría'
										: 'Elige primero una categoría'}
								</Typography>
							</MenuItem>
							{data.map((x) => (
								<MenuItem key={x.id} value={x.id}>
									{x.descripcion}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

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
