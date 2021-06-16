import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VentasContext from '../../context/ventas/ventasContext';
import { calcTotCarr } from '../../functions/ventas';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(0.5),
		padding: theme.spacing(1.5),
	},
	texto: {
		fontSize: '17px',
	},
}));

const TotalCarrito = () => {
	const classes = useStyles();

	const [valor, setValor] = useState(0);

	const { carrito } = useContext(VentasContext);

	useEffect(() => {
		const tot = calcTotCarr(carrito);
		setValor(tot);
	}, [carrito, carrito.length]);

	return (
		<Box display="flex" p={1} bgcolor="background.paper">
			<Box flexGrow={1}>
				<Typography className={classes.texto} variant="overline">
					Total:
				</Typography>
			</Box>
			<Box>
				<Typography className={classes.texto} variant="overline">
					{new Intl.NumberFormat('de-De', {
						style: 'decimal',
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					}).format(parseFloat(valor))}
				</Typography>
			</Box>
		</Box>
	);
};

export default TotalCarrito;
