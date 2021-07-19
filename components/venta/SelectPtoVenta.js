import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import VentasContext from '../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		// margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SelectPtoVenta = ({ ptoVenta, handlePtoVenta }) => {
	const classes = useStyles();

	const { ptosVenta, traerPtosVenta } = useContext(VentasContext);

	useEffect(() => {
		traerPtosVenta();
	}, []);

	const handleChange = (event) => {
		handlePtoVenta(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<InputLabel shrink>Punto de Venta</InputLabel>
			<Select
				className={classes.selectEmpty}
				name="ptoventa"
				value={ptoVenta}
				onChange={handleChange}
				autoWidth
				displayEmpty
				inputProps={{
					classes: {
						icon: classes.icon,
					},
				}}
			>
				{ptosVenta
					? ptosVenta.map((x) => (
							<MenuItem key={x.id} value={x.id}>
								{x.descripcion}
							</MenuItem>
					  ))
					: null}
			</Select>
		</FormControl>
	);
};

export default SelectPtoVenta;
