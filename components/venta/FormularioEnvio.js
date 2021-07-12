import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import VentasContext from '../../context/ventas/ventasContext';
import BotonFilaTabla from '../tablas/componentes/BotonFilaTabla';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import InputBordeInferior from '../generales/inputs/InputBordeInferior';

const useStyles = makeStyles((theme) => ({
	boton: {
		width: '100%',
		height: '100%',
	},
}));

// label, ancho, valores, descripcionValores
const selectDirecc = {
	name: 'direccion',
	label: 'Dirección',
	ancho: 11,
	valDefault: 10,
};

const selectTipo = {
	name: 'tipo',
	label: 'Tipo',
	ancho: 6,
	valDefault: 1,
};

const inputCosto = {
	name: 'costo',
	label: 'Costo ($)',
	placeholder: 'Costo',
	ancho: 6,
	required: true,
};

const FormularioEnvio = ({
	cliente,
	modoDirecc,
	setModoDirecc,
	valSelectDireccion,
	valInputDireccion,
	valSelectTipo,
	valInputCosto,
	handleSelectDireccion,
	handleInputDireccion,
	handleSelectTipo,
	handleInputCosto,
}) => {
	const classes = useStyles();

	const { tiposEnvio } = useContext(VentasContext);

	const handleSwitchDireccion = () => {
		if (modoDirecc === 'select') {
			setModoDirecc('input');
		} else if (modoDirecc === 'input') {
			setModoDirecc('select');
		}
	};

	return (
		<Grid container spacing={2}>
			{modoDirecc === 'select' ? (
				<SelectBordeInferior
					key={1}
					name={selectDirecc.name}
					label={selectDirecc.label}
					ancho={selectDirecc.ancho}
					data={cliente.direcciones}
					valInit={valSelectDireccion}
					funcModState={handleSelectDireccion}
				/>
			) : (
				<InputBordeInferior
					label="Dirección"
					name="direccion"
					placeholder="Dirección"
					ancho={11}
					valInit={valInputDireccion}
					funcModState={handleInputDireccion}
				/>
			)}

			<Grid item xs={1}>
				<Box
					className={classes.boton}
					display="flex"
					justifyContent="center"
					alignItems="flex-end"
				>
					<BotonFilaTabla
						contenido={<FlipCameraAndroidIcon />}
						onClick={() => {
							handleSwitchDireccion();
						}}
					/>
				</Box>
			</Grid>

			<SelectBordeInferior
				key={2}
				name={selectTipo.name}
				label={selectTipo.label}
				ancho={selectTipo.ancho}
				data={tiposEnvio}
				valInit={valSelectTipo}
				funcModState={handleSelectTipo}
			/>
			<InputNumberBordeInferior
				name={inputCosto.name}
				label={inputCosto.label}
				placeholder={inputCosto.placeholder}
				ancho={inputCosto.ancho}
				required={inputCosto.required}
				valInit={valInputCosto}
				funcModState={handleInputCosto}
			/>
		</Grid>
	);
};

export default FormularioEnvio;
