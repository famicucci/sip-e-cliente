import React, { useContext } from 'react';
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
	const { openModalEditExpense, handleOpenModalEditExpense } =
		useContext(GastoContext);

	// const initialState = {
	// 	createdAt: new Date(),
	// 	estado: 'Pago',
	// 	GastoCategoriaId: 1,
	// 	GastoSubcategoriaId: null,
	// 	descripcion: '',
	// 	importe: '',
	// };

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
				initialState={initialState}
				handleClose={() => {
					handleOpenModalEditExpense(false);
				}}
			/>
		</ModalCentrado>
	);
};

export default EditarGasto;
