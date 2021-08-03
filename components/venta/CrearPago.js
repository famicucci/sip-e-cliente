import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalCentrado from '../generales/ModalCentrado';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import { Grid } from '@material-ui/core';
import BotonSuccess from '../generales/botones/BotonSuccess';
import InputFecha from '../generales/inputs/InputFecha';
import InputNumberBordeInferior from '../generales/inputs/InputNumberBordeInferior';
import SelectBordeInferior from '../generales/inputs/SelectBordeInferior';
import AlertaContext from '../../context/alertas/alertaContext';
import moment from 'moment';
import { FacturaBD } from '../../functions/Factura';

const selectMetodoPago = {
	name: 'metodopago',
	label: 'Metodo de Pago',
	ancho: 12,
	valDefault: 1,
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	botonAceptar: {
		float: 'right',
		width: '100%',
	},
	contenido: { fontSize: theme.typography.pxToRem(17) },
}));

const CrearPago = () => {
	const classes = useStyles();

	const {
		filaActiva,
		openModalCrearPago,
		metodosPago,
		handleCloseModalCrearPago,
		crearFactura,
		traerMetodosPago,
		crearPago,
		handleFactura,
	} = useContext(EditarOrdenesContext);
	const { mostrarAlerta } = useContext(AlertaContext);

	const factura = new FacturaBD(filaActiva.Factura);

	const [pago, setPago] = useState({
		createdAt: moment(new Date()).toISOString(),
		importe: factura.importeFinal - factura.sumaPagos(),
		MetodoPagoId: '',
	});

	useEffect(() => {
		if (metodosPago.length === 0) {
			traerMetodosPago();
		}
	}, []);

	const handleFecha = (date) => {
		setPago({ ...pago, createdAt: moment(date).toISOString() });
	};

	const handleImporte = (name, value) => {
		setPago({ ...pago, importe: value });
	};

	const handleMetodoPago = (name, value) => {
		setPago({ ...pago, MetodoPagoId: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validacion
		if (pago.MetodoPagoId === '') {
			mostrarAlerta('Debes ingresar un metodo de pago', 'error');
			return;
		}

		if (pago.importe === '') {
			mostrarAlerta('Debes ingresar un importe', 'error');
			return;
		}

		if (pago.importe > factura.importeFinal - factura.sumaPagos()) {
			mostrarAlerta(
				'El importe ingresado es mayor a lo que queda por pagar',
				'error'
			);
			return;
		}

		if (pago.importe < 0) {
			mostrarAlerta('El importe no puede ser negativo', 'error');
			return;
		}

		const pagoMod = { ...pago, FacturaId: factura.id };

		// submit
		crearPago(pagoMod);

		handleCloseModalCrearPago();
	};

	return (
		<form
			noValidate
			autoComplete="off"
			onSubmit={onSubmit}
			id="form-crear-pago"
		>
			<ModalCentrado
				openModal={openModalCrearPago}
				handleClose={handleCloseModalCrearPago}
				padding={16}
				width={300}
				titulo="Crear Pago"
				footer={
					<BotonSuccess
						type="submit"
						form="form-crear-pago"
						contenido="Aceptar"
						className={classes.botonAceptar}
					/>
				}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<InputFecha funcModState={handleFecha} />
					</Grid>
					<InputNumberBordeInferior
						label="Importe"
						name="importe"
						placeholder="Agrega un importe..."
						ancho={12}
						required
						valInit={factura.importeFinal - factura.sumaPagos()} // lo que queda por pagar
						funcModState={handleImporte}
						InputProps={{
							inputProps: {
								max: factura.importeFinal - factura.sumaPagos(),
							},
						}}
					/>
					<SelectBordeInferior
						key={2}
						name={selectMetodoPago.name}
						label={selectMetodoPago.label}
						ancho={selectMetodoPago.ancho}
						data={metodosPago}
						valInit="none"
						placeholder="Metodo de Pago..."
						funcModState={handleMetodoPago}
					/>
				</Grid>
			</ModalCentrado>
		</form>
	);
};

export default CrearPago;
