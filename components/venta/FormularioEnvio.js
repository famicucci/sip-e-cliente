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
	root: {
		width: '100%',
		'& .MuiTextField-root': {
			marginBottom: theme.spacing(1),
			width: '100%',
		},
	},
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

const inputDirecc = {
	name: 'direccion',
	label: 'Dirección',
	placeholder: 'Dirección',
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
	stateEnvio,
	handleSelectDireccion,
	handleInputDireccion,
	handleSelectTipo,
	handleInputCosto,
	handleSwitchDireccion,
	onSubmit,
	facturasOrden,
}) => {
	const classes = useStyles();

	const {
		modoDirecc,
		dataDirecciones,
		valSelectDireccion,
		valInputDireccion,
		valSelectTipo,
		valInputCosto,
	} = stateEnvio;
	const { tiposEnvio } = useContext(VentasContext);

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
			id="form-envio"
		>
			<Grid container spacing={2}>
				{modoDirecc === 'select' ? (
					<SelectBordeInferior
						key={1}
						name={selectDirecc.name}
						label={selectDirecc.label}
						ancho={selectDirecc.ancho}
						data={dataDirecciones}
						valInit={valSelectDireccion}
						funcModState={handleSelectDireccion}
					/>
				) : (
					<InputBordeInferior
						label={inputDirecc.label}
						name={inputDirecc.name}
						placeholder={inputDirecc.placeholder}
						ancho={inputDirecc.ancho}
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
					disabled={facturasOrden.length > 0 ? true : false}
				/>
			</Grid>
		</form>
	);
};

export default FormularioEnvio;
