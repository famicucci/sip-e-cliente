import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AlertaContext from '../../context/alertas/alertaContext';
import Alerta from '../generales/Alerta';
import EditarOrdenesContext from '../../context/ventas/editarordenes/EditarOrdenesContext';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const BootstrapButton = withStyles({
	root: {
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		padding: '6px 12px',
		border: '1px solid',
		borderRadius: '5px',
		lineHeight: 1.5,
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
	},
})(Button);

const SelectOrdenEstado = ({ idOrden, ordenEstadoId }) => {
	const { orderStatuses } = useContext(GlobalDataContext);
	const { handleEstadoOrden, mensaje } = useContext(EditarOrdenesContext);
	const { alerta, mostrarAlerta } = useContext(AlertaContext);

	const [ordenEstadoDescripcion, setOrdenEstadoDescripcion] = useState(null);
	const [color, setColor] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		const modEstadoDescripcionColor = (estados, ordenEstadoId) => {
			const r = estados.find((x) => x.id === ordenEstadoId);
			setOrdenEstadoDescripcion(r ? r.descripcion : null);
			setColor(r ? r.color : null);
		};
		modEstadoDescripcionColor(orderStatuses, ordenEstadoId);
	}, [orderStatuses, ordenEstadoId]);

	useEffect(() => {
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}
	}, [mensaje]);

	const handleClickBoton = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClickItem = (orden, value, descripcion) => {
		handleEstadoOrden(orden, value, descripcion);
		setAnchorEl(null);
	};

	const handleClose = (event) => {
		setAnchorEl(null);
	};

	return (
		<div>
			<BootstrapButton
				variant="outlined"
				color="primary"
				disableRipple
				onClick={handleClickBoton}
				style={{
					border: `1px solid ${color}`,
					color: `${color}`,
				}}
			>
				{ordenEstadoDescripcion}
			</BootstrapButton>
			{orderStatuses ? (
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					{orderStatuses.map((x) => (
						<MenuItem
							key={x.id}
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
			) : null}

			{alerta !== null ? <Alerta /> : null}
		</div>
	);
};

export default SelectOrdenEstado;
