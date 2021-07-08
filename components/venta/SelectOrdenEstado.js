import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import VentasContext from '../../context/ventas/ventasContext';

const BootstrapInput = withStyles((theme) => ({
	input: {
		borderRadius: 10,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		fontSize: 16,
		fontWeight: 'bold',
		padding: '7px 26px 7px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 10,
		},
	},
}))(InputBase);

const SelectOrdenEstado = ({ valInit }) => {
	const { estadosOrden } = useContext(VentasContext);

	const [estadoOrden, setEstadoOrden] = useState('');

	useEffect(() => {
		setEstadoOrden(valInit);
	}, []);

	const handleColor = (estados, value) => {
		const r = estados.find((x) => x.id === value);
		return r ? r.color : null;
	};

	const handleChange = (event) => {
		setEstadoOrden(event.target.value);
	};

	return (
		<FormControl>
			<Select
				value={estadoOrden}
				onChange={handleChange}
				input={
					<BootstrapInput
						style={{
							border: `1px solid ${handleColor(estadosOrden, estadoOrden)}`,
							borderRadius: 10,
						}}
					/>
				}
			>
				{estadosOrden.map((x) => (
					<MenuItem value={x.id}>
						<span style={{ color: `${x.color}`, fontWeight: 'bold' }}>
							{x.descripcion}
						</span>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectOrdenEstado;
