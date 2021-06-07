import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { IconButton } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import TablaElegirPtoStock from '../TablaElegirPtoStock';
import VentasContext from '../../../context/ventas/ventasContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const BotonElegirPtoStock = ({ cantidad, codigoProducto }) => {
	const classes = useStyles();

	const [producto, setProducto] = useState(null);

	const handleOnShow = (codigo) => {
		const tabla = () => <TablaElegirPtoStock codigo={codigo} />;
		setProducto(tabla);
	};

	return (
		<div className={classes.root}>
			<Badge
				color="default"
				badgeContent={cantidad}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				showZero
			>
				<Tippy
					content={producto}
					interactive={true}
					theme={'light-border'}
					placement={'left'}
					onShow={() => {
						handleOnShow(codigoProducto);
					}}
				>
					<IconButton size="small">
						<CallMadeIcon fontSize="default" />
					</IconButton>
				</Tippy>
			</Badge>
		</div>
	);
};

export default BotonElegirPtoStock;
