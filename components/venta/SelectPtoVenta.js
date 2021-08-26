import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SelectPtoVenta = ({ ptoVenta, handlePtoVenta }) => {
	const classes = useStyles();

	const { salePoints, getSalePoints } = useContext(GlobalDataContext);

	useEffect(() => {
		if (!salePoints) getSalePoints();
	}, []);

	const handleChange = (event) => {
		handlePtoVenta(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<InputLabel shrink>Pto. Venta</InputLabel>
			{salePoints ? (
				<Select
					className={classes.selectEmpty}
					name="ptoventa"
					value={ptoVenta}
					defaultValue=""
					onChange={handleChange}
					autoWidth
					displayEmpty
					inputProps={{
						classes: {
							icon: classes.icon,
						},
					}}
				>
					{salePoints.map((x) => (
						<MenuItem key={x.id} value={x.id}>
							{x.descripcion}
						</MenuItem>
					))}
				</Select>
			) : null}
		</FormControl>
	);
};

export default SelectPtoVenta;
