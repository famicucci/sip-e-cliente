import React, { useState, useEffect, useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import VentasContext from '../../context/ventas/ventasContext';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const BootstrapButton = withStyles({
	root: {
		boxShadow: 'none',
		color: 'red',
		textTransform: 'none',
		fontSize: 16,
		padding: '6px 12px',
		border: '1px solid',
		borderRadius: '10px',
		lineHeight: 1.5,
		// backgroundColor: '#0063cc',
		borderColor: 'red',
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
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#0062cc',
			borderColor: '#005cbf',
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		},
	},
})(Button);

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

const SelectOrdenEstado = ({ idOrden, estado }) => {
	const classes = useStyles();

	const { estadosOrden, handleEstadoOrden } = useContext(VentasContext);

	const [estadoOrden, setEstadoOrden] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClickItem = (orden, value, descripcion) => {
		console.log(orden);
		console.log(value);
		console.log(descripcion);
		handleEstadoOrden(orden, value, descripcion);
		setEstadoOrden(value);
		setAnchorEl(null);
	};

	const handleClose = (event) => {
		setAnchorEl(null);
	};

	const handleColor = (estados, value) => {
		const r = estados.find((x) => x.id === value);
		return r ? r.color : null;
	};

	return (
		<div>
			<BootstrapButton
				variant="outlined"
				color="primary"
				disableRipple
				className={classes.margin}
				onClick={handleClick}
				style={{
					border: `1px solid ${handleColor(estadosOrden, estadoOrden)}`,
					borderRadius: 10,
				}}
			>
				{estado}
			</BootstrapButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{estadosOrden.map((x) => (
					<MenuItem
						value={x.id}
						onClick={() => {
							handleClickItem(idOrden, x.id, x.descripcion);
						}}
					>
						<span style={{ color: `${x.color}`, fontWeight: 'bold' }}>
							{x.descripcion}
						</span>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default SelectOrdenEstado;
